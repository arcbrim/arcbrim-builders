import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

export type PageData = {
  title?: string;
  lede?: string;
};

export function loadPage(slug: string): { data: PageData; html: string } {
  const filePath = path.join(process.cwd(), `content/pages/${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const html = md.render((parsed.content || "").trim());
  return { data: (parsed.data || {}) as PageData, html };
}
