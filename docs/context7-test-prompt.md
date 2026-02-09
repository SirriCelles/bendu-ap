# Context7 Compliance Test Prompt

Use this prompt in Codex to verify Context7 is being used for docs-backed answers:

```
Use official documentation to answer this. Do not rely on memory.

Task:
1) For Next.js App Router, show a minimal `generateMetadata` example for a dynamic route.
2) Include one gotcha to avoid.
3) Include one source link from the official docs.
4) Print this exact final line: CONTEXT7_USED: /vercel/next.js
```

Pass criteria:

- The response includes the exact sentinel line.
- The response includes an official Next.js docs source link.
- The response content matches current docs conventions.
