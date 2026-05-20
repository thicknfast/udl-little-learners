import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Resource, ResourceFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "resources");

function getResourceFiles(dir: string = CONTENT_DIR): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getResourceFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllResources(): Resource[] {
  const files = getResourceFiles();
  return files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { ...(data as ResourceFrontmatter), content };
    })
    .sort((a, b) => {
      // Featured items first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const partOrder = { "1": 1, "2": 2, "3": 3, bonus: 4 };
      const pa = partOrder[a.part] ?? 99;
      const pb = partOrder[b.part] ?? 99;
      if (pa !== pb) return pa - pb;
      if ((a.chapter ?? 99) !== (b.chapter ?? 99))
        return (a.chapter ?? 99) - (b.chapter ?? 99);
      return a.order - b.order;
    });
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return getAllResources().find((r) => r.slug === slug);
}

export function getResourcesByChapter(chapter: number): Resource[] {
  return getAllResources().filter((r) => r.chapter === chapter);
}

export function getResourcesByType(type: string): Resource[] {
  return getAllResources().filter((r) => r.type === type);
}

export function getResourcesByPart(part: string): Resource[] {
  return getAllResources().filter((r) => r.part === part);
}
