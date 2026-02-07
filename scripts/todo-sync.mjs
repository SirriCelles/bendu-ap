import fs from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://api.github.com";
const LABEL = "todo-sync";

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

  return res.json();
}

async function listExistingIssuesByTitle(title) {
  const q = [
    `repo:${owner}/${repoName}`,
    "type:issue",
    `in:title`,
    `"${title.replace(/"/g, '\\"')}"`,
    `label:${LABEL}`,
  ].join(" ");
  const data = await gh(`/search/issues?q=${encodeURIComponent(q)}`);
  return data.items ?? [];
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

async function updateIssue(number, body) {
  return gh(`/repos/${owner}/${repoName}/issues/${number}`, {
    method: "PATCH",
    body: JSON.stringify({ body }),
  });
}

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else if (entry.isFile() && entry.name === "todo.md") {
      files.push(full);
    }
  }
  return files;
}

function parseTodo(content, filePath) {
  const items = [];
  const lines = content.split(/\r?\n/);
  let currentSection = "";

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const headingMatch = /^#{1,6}\s+(.*)$/.exec(line);
    if (headingMatch) {
      currentSection = headingMatch[1].trim();
      continue;
    }

    const taskMatch = /^\s*-\s+\[\s([xX ])\s\]\s+(.*)$/.exec(line);
    if (!taskMatch) continue;

    const checked = taskMatch[1].toLowerCase() === "x";
    const title = taskMatch[2].trim();
    if (!title) continue;

    items.push({
      checked,
      title,
      section: currentSection,
      filePath,
      lineNumber: i + 1,
    });
  }

  return items;
}

function issueTitle(item) {
  return `TODO: ${item.title}`;
}

function issueBody(item) {
  const section = item.section ? `## Section\n${item.section}\n\n` : "";
  return [
    "This issue is synced from `todo.md`.",
    "",
    section,
    "## Source",
    `- File: \`${item.filePath}\``,
    `- Line: ${item.lineNumber}`,
    "",
    "## Status",
    item.checked ? "- [x] Completed in todo.md" : "- [ ] Not completed in todo.md",
  ].join("\n");
}

async function run() {
  await ensureLabel();

  const todoFiles = await walk(process.cwd());
  const allItems = [];

  for (const filePath of todoFiles) {
    const content = await fs.readFile(filePath, "utf8");
    allItems.push(...parseTodo(content, path.relative(process.cwd(), filePath)));
  }

  const pending = allItems.filter((item) => !item.checked);

  for (const item of pending) {
    const title = issueTitle(item);
    const body = issueBody(item);
    const existing = await listExistingIssuesByTitle(title);

    if (existing.length === 0) {
      await createIssue(title, body);
      continue;
    }

    const issue = existing[0];
    if (issue.body !== body) {
      await updateIssue(issue.number, body);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
