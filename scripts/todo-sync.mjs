import fs from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://api.github.com";
const LABEL = "todo-sync";
const TODO_PATH = process.env.TODO_PATH ?? "todo.md";

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;

if (!repo) {
  console.error("GITHUB_REPOSITORY is not set.");
  process.exit(1);
}

if (!token) {
  console.error("GITHUB_TOKEN is not set.");
  process.exit(1);
}

const [owner, repoName] = repo.split("/");

async function gh(pathname, options = {}) {
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${options.method ?? "GET"} ${pathname} failed: ${res.status} ${text}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

async function ensureLabel() {
  try {
    await gh(`/repos/${owner}/${repoName}/labels/${encodeURIComponent(LABEL)}`);
  } catch {
    await gh(`/repos/${owner}/${repoName}/labels`, {
      method: "POST",
      body: JSON.stringify({ name: LABEL, color: "1d76db", description: "Synced from todo.md" }),
    });
  }
}

async function listSyncedIssues() {
  const issues = [];
  let page = 1;

  while (true) {
    const data = await gh(
      `/repos/${owner}/${repoName}/issues?state=all&labels=${encodeURIComponent(LABEL)}&per_page=100&page=${page}`
    );
    const batch = (data ?? []).filter((item) => !item.pull_request);
    issues.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  return issues;
}

async function createIssue(title, body) {
  return gh(`/repos/${owner}/${repoName}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      labels: [LABEL],
    }),
  });
}

async function patchIssue(number, meta) {
  return gh(`/repos/${owner}/${repoName}/issues/${number}`, {
    method: "PATCH",
    body: JSON.stringify(meta),
  });
}

function parseTasks(content, filePath) {
  const tasks = [];
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const headingMatch = /^##\s+(T-[^\s]+)\s+—\s+(.+)$/.exec(lines[i]);
    if (!headingMatch) {
      continue;
    }

    const id = headingMatch[1].trim();
    const title = headingMatch[2].trim();
    const lineNumber = i + 1;

    let issueKey = "";
    let status = "TODO";

    for (let j = i + 1; j < Math.min(i + 8, lines.length); j += 1) {
      const markerMatch = /^<!--\s*issue:\s*([^\s]+)\s*-->$/.exec(lines[j]);
      if (markerMatch) {
        issueKey = markerMatch[1].trim();
      }

      const statusMatch = /^Status:\s*(TODO|IN_PROGRESS|DONE)\s*$/.exec(lines[j]);
      if (statusMatch) {
        status = statusMatch[1];
      }
    }

    let end = i + 1;
    while (
      end < lines.length &&
      !/^##\s+T-[^\s]+\s+—\s+/.test(lines[end]) &&
      !/^##\s+Milestone\b/.test(lines[end]) &&
      !/^##\s+Immediate Next Actions\b/.test(lines[end])
    ) {
      end += 1;
    }

    const block = lines.slice(i, end).join("\n").trim();

    tasks.push({
      id,
      title,
      issueKey: issueKey || `bookeasy:${id}`,
      status,
      filePath,
      lineNumber,
      block,
    });
  }

  return tasks;
}

function issueTitle(task) {
  return `${task.id} — ${task.title}`;
}

function issueBody(task) {
  return [
    "This issue is synced from `todo.md`.",
    "",
    `<!-- issue: ${task.issueKey} -->`,
    "",
    "## Source",
    `- File: \`${task.filePath}\``,
    `- Line: ${task.lineNumber}`,
    "",
    "## Status",
    `- ${task.status}`,
    "",
    "## Task Block",
    "```md",
    task.block,
    "```",
  ].join("\n");
}

function extractIssueKeyFromBody(body) {
  if (!body) return null;
  const match = /<!--\s*issue:\s*([^\s]+)\s*-->/i.exec(body);
  return match ? match[1].trim() : null;
}

async function run() {
  await ensureLabel();

  const todoAbsPath = path.resolve(process.cwd(), TODO_PATH);
  let content;
  try {
    content = await fs.readFile(todoAbsPath, "utf8");
  } catch (error) {
    throw new Error(`Unable to read TODO_PATH "${TODO_PATH}": ${error.message}`);
  }

  const relativePath = path.relative(process.cwd(), todoAbsPath);
  const tasks = parseTasks(content, relativePath);
  const existingIssues = await listSyncedIssues();

  const issuesByKey = new Map();
  const issuesByTitle = new Map();

  for (const issue of existingIssues) {
    const key = extractIssueKeyFromBody(issue.body);
    if (key && !issuesByKey.has(key)) {
      issuesByKey.set(key, issue);
    }

    if (!issuesByTitle.has(issue.title)) {
      issuesByTitle.set(issue.title, issue);
    }
  }

  for (const task of tasks) {
    const title = issueTitle(task);
    const body = issueBody(task);
    const desiredState = task.status === "DONE" ? "closed" : "open";

    const existing = issuesByKey.get(task.issueKey) ?? issuesByTitle.get(title) ?? null;

    if (!existing) {
      const created = await createIssue(title, body);
      if (desiredState === "closed") {
        await patchIssue(created.number, { state: "closed" });
      }
      continue;
    }

    const patch = {};
    if (existing.title !== title) {
      patch.title = title;
    }
    if (existing.body !== body) {
      patch.body = body;
    }
    if (existing.state !== desiredState) {
      patch.state = desiredState;
    }

    if (Object.keys(patch).length > 0) {
      await patchIssue(existing.number, patch);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
