# Context7 Compliance Test Run

Run date: 2026-02-07
Prompt source: `docs/context7-test-prompt.md`
Context7 library used: `/vercel/next.js/v16.1.1`

## Response

```ts
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetch(`https://api.example.com/posts/${slug}`).then((r) => r.json());

  return {
    title: post.title,
    description: post.description,
  };
}
```

Gotcha: in current App Router docs, `params`/`searchParams` are async in these examples, so treat them as awaited values when building metadata.

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

CONTEXT7_USED: /vercel/next.js

## Checks

- Sentinel line present: `CONTEXT7_USED: /vercel/next.js`
- Official docs link present: `https://nextjs.org/docs/app/api-reference/functions/generate-metadata`
