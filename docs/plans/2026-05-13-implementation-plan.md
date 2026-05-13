# UDL for Little Learners — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a companion Resource Hub website for Jeff Horwitz's *UDL for Little Learners* book, with 5 pages, 13 downloadable resources, and a playful book-cover-inspired design.

**Architecture:** Next.js 16 App Router with file-based MDX content. Resources stored as MDX files with frontmatter metadata, PDFs in `public/`. Tailwind v4 for styling. Static generation for all pages. Contact form via Formspree (free tier). Deployed on Vercel.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, next-mdx-remote, gray-matter, Formspree, Vercel

**Design doc:** `docs/plans/2026-05-13-udl-companion-site-design.md`

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`

**Step 1: Initialize Next.js 16 project**

Run:
```bash
cd C:\Users\bhorw\projects\udl-little-learners
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept defaults. This creates the full scaffold.

**Step 2: Install content dependencies**

```bash
npm install next-mdx-remote gray-matter reading-time
npm install -D @types/node
```

- `next-mdx-remote` — renders MDX content in server components
- `gray-matter` — parses YAML frontmatter from MDX files
- `reading-time` — optional, shows estimated read time on resources

**Step 3: Install fonts**

```bash
npm install @fontsource/nunito @fontsource/inter
```

- Nunito: friendly rounded display font for headings
- Inter: clean sans-serif for body text

**Step 4: Configure Tailwind v4 theme**

Replace `src/app/globals.css` with the custom theme:

```css
@import "tailwindcss";
@import "@fontsource/nunito/400.css";
@import "@fontsource/nunito/600.css";
@import "@fontsource/nunito/700.css";
@import "@fontsource/nunito/800.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";

@theme inline {
  --color-cream: #FDF8F0;
  --color-blue: #3B82C4;
  --color-blue-dark: #2B6299;
  --color-orange: #E8853D;
  --color-orange-dark: #D06E28;
  --color-green: #5BA847;
  --color-yellow: #F5C242;
  --color-pink: #E05A6D;
  --color-text: #2D3748;
  --color-text-light: #64748B;
  --color-border: #E2D9CC;
  --font-display: 'Nunito', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-cream);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}
```

**Step 5: Set up root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UDL for Little Learners — Resource Hub",
    template: "%s | UDL for Little Learners",
  },
  description:
    "Companion resources for UDL for Little Learners by Jeff Horwitz. Practical strategies for early childhood educators.",
  metadataBase: new URL("https://udlforlittlelearners.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-text antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 6: Replace placeholder home page**

Replace `src/app/page.tsx` with a simple placeholder:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-display text-4xl font-bold text-blue">
        UDL for Little Learners
      </h1>
    </main>
  );
}
```

**Step 7: Verify it builds**

```bash
cd C:\Users\bhorw\projects\udl-little-learners
npx next build
```

Expected: Build succeeds with no errors.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 project with Tailwind v4 theme"
```

---

## Task 2: Content Infrastructure

**Files:**
- Create: `src/lib/resources.ts`, `src/lib/types.ts`
- Create: `content/resources/bonus/executive-skills.mdx` (test resource)

**Step 1: Define TypeScript types**

Create `src/lib/types.ts`:

```typescript
export type ResourceType =
  | "bonus-chapter"
  | "discussion-guide"
  | "template"
  | "reference"
  | "photo"
  | "video";

export interface ResourceFrontmatter {
  title: string;
  slug: string;
  chapter: number | null;
  chapterTitle: string | null;
  part: "1" | "2" | "3" | "bonus";
  type: ResourceType;
  description: string;
  downloadFile: string | null;
  videoUrl: string | null;
  driveUrl: string | null;
  order: number;
}

export interface Resource extends ResourceFrontmatter {
  content: string;
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  "bonus-chapter": "Bonus Chapters",
  "discussion-guide": "Discussion & Activities",
  template: "Templates & Lesson Plans",
  reference: "Reference Sheets",
  photo: "Photos & Classroom Examples",
  video: "Videos",
};

export const BOOK_PARTS = [
  {
    part: "1" as const,
    title: "Background",
    chapters: [
      { num: 1, title: "What is Universal Design for Learning?" },
      { num: 2, title: "Designing the Environment" },
      { num: 3, title: "Community and Connections" },
    ],
  },
  {
    part: "2" as const,
    title: "Embedded Practices",
    chapters: [
      { num: 4, title: "Transitions" },
      { num: 5, title: "Reflection" },
      { num: 6, title: "Small Group Instruction" },
      { num: 7, title: "Emotional Literacy" },
      { num: 8, title: "Centers" },
    ],
  },
  {
    part: "3" as const,
    title: "From the Day",
    chapters: [
      { num: 9, title: "Arrival and Morning Routines" },
      { num: 10, title: "Morning Meeting" },
      { num: 11, title: "Calendar" },
      { num: 12, title: "Reading, Phonics and Literacy" },
      { num: 13, title: "Writing" },
      { num: 14, title: "Recess" },
      { num: 15, title: "Math" },
      { num: 16, title: "Read Alouds and Reading Comprehension" },
      { num: 17, title: "Closing Circle and Dismissal" },
    ],
  },
];
```

**Step 2: Create content loading library**

Create `src/lib/resources.ts`:

```typescript
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
      // Sort by part, then chapter, then order
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
```

**Step 3: Create a test MDX resource**

Create `content/resources/bonus/executive-skills.mdx`:

```mdx
---
title: "Executive Skills Reference"
slug: "executive-skills"
chapter: null
chapterTitle: null
part: "bonus"
type: "reference"
description: "A concise reference defining the eight core executive function skills relevant to early childhood education."
downloadFile: "/resources/executive-skills.pdf"
videoUrl: null
driveUrl: null
order: 4
---

## Executive Skill Resource

Executive function skills are cognitive processes that help us manage our thoughts, actions, and emotions. For our youngest learners, these are just beginning to develop.

### Working Memory

The ability to hold and work with information in mind — like remembering a set of instructions while carrying them out.

### Inhibitory Control (Impulse Control)

The ability to stop and think before acting — like waiting for your turn during circle time.

### Cognitive Flexibility (Shifting)

The ability to shift thinking or attention — like moving from one activity to another without frustration.

### Planning

The ability to think ahead and create steps to reach a goal — like deciding what materials to gather before starting an art project.

### Organization

The ability to keep track of materials and information — like putting supplies back in the right spot.

### Initiation

The ability to begin a task independently — like starting homework or tidying up a play area.

### Self-Monitoring

The ability to check your own work and behavior — like re-reading a sentence to see if it makes sense.

### Emotional Regulation

The ability to manage emotions in different situations — like calming down after a disagreement with a peer.
```

**Step 4: Verify content loads**

Create a quick test — temporarily update `src/app/page.tsx`:

```tsx
import { getAllResources } from "@/lib/resources";

export default function Home() {
  const resources = getAllResources();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="font-display text-4xl font-bold text-blue">
        UDL for Little Learners
      </h1>
      <p className="text-text-light">
        {resources.length} resource(s) loaded
      </p>
      {resources.map((r) => (
        <div key={r.slug} className="rounded-xl border border-border bg-white p-4">
          <h2 className="font-display text-lg font-bold">{r.title}</h2>
          <p className="text-sm text-text-light">{r.description}</p>
        </div>
      ))}
    </main>
  );
}
```

Run:
```bash
npx next build
```

Expected: Build succeeds, 1 resource loaded.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add content infrastructure — types, MDX loader, test resource"
```

---

## Task 3: Shared Layout Components

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/Container.tsx`
- Modify: `src/app/layout.tsx`
- Copy: book cover, HCG logo to `public/images/`

**Step 1: Copy static assets**

```bash
mkdir -p public/images/classroom
cp "/c/Users/bhorw/Downloads/UDL for little learners/C257F311-0CD4-4DA2-A2CC-0187D022898D.png" public/images/cover.png
cp "/c/Users/bhorw/Downloads/UDL for little learners/Copy of Horwitz Consulting Group Logo.png" public/images/hcg-logo.png
cp "/c/Users/bhorw/Downloads/Little Learners Resources/Little Learners Resources/Calm Spaces/B58B2AD6-6DF2-4737-9723-D4D253B62B9B_1_105_c.jpeg" public/images/classroom/calm-spaces.jpg
```

**Step 2: Create Container component**

Create `src/components/Container.tsx`:

```tsx
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

**Step 3: Create Nav component**

Create `src/components/Nav.tsx`:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/book", label: "Book" },
  { href: "/connect", label: "Connect" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/cover.png"
            alt="UDL for Little Learners"
            width={36}
            height={48}
            className="rounded-sm shadow-sm"
          />
          <span className="hidden font-display text-lg font-bold text-blue sm:block">
            UDL for Little Learners
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-blue/10 text-blue"
                  : "text-text hover:bg-blue/5 hover:text-blue"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-text hover:bg-blue/5 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border px-4 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-blue/10 text-blue"
                  : "text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

**Step 4: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/edtech_jeff",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/mrteachersir",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeff-horwitz-302b1326",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white/50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/hcg-logo.png"
              alt="Horwitz Consulting Group"
              width={40}
              height={40}
              className="rounded"
            />
            <div className="text-sm text-text-light">
              <p>&copy; {new Date().getFullYear()} Jeff Horwitz</p>
              <p>
                Published by{" "}
                <span className="font-medium text-text">Jossey-Bass</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light transition-colors hover:text-blue"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-text-light sm:justify-start">
          <Link href="/about" className="hover:text-blue">About</Link>
          <Link href="/resources" className="hover:text-blue">Resources</Link>
          <Link href="/book" className="hover:text-blue">Book</Link>
          <Link href="/connect" className="hover:text-blue">Connect</Link>
        </div>
      </div>
    </footer>
  );
}
```

**Step 5: Update root layout to include Nav and Footer**

Update `src/app/layout.tsx` to wrap pages with `<Nav />` and `<Footer />`:

```tsx
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UDL for Little Learners — Resource Hub",
    template: "%s | UDL for Little Learners",
  },
  description:
    "Companion resources for UDL for Little Learners by Jeff Horwitz. Practical strategies for early childhood educators.",
  metadataBase: new URL("https://udlforlittlelearners.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-text antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 6: Verify build**

```bash
npx next build
```

Expected: Build succeeds.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Nav, Footer, Container components and static assets"
```

---

## Task 4: Home Page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `content/pages/home.mdx`

**Step 1: Create home page content**

Create `content/pages/home.mdx`:

```mdx
---
heroSubtitle: "Practical Strategies for Early Childhood Educators"
heroDescription: "Welcome to the companion Resource Hub for UDL for Little Learners. Here you'll find downloadable guides, bonus chapters, templates, and activities to deepen your practice."
testimonials:
  - quote: "Placeholder for endorsement quote."
    author: "Reviewer Name"
    title: "Title, School/Organization"
  - quote: "Placeholder for endorsement quote."
    author: "Reviewer Name"
    title: "Title, School/Organization"
  - quote: "Placeholder for endorsement quote."
    author: "Reviewer Name"
    title: "Title, School/Organization"
---
```

**Step 2: Build home page component**

Replace `src/app/page.tsx` with the full Home page:

```tsx
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Container } from "@/components/Container";
import { getAllResources } from "@/lib/resources";

function getHomeContent() {
  const filePath = path.join(process.cwd(), "content", "pages", "home.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).data as {
    heroSubtitle: string;
    heroDescription: string;
    testimonials: { quote: string; author: string; title: string }[];
  };
}

export default function Home() {
  const { heroSubtitle, heroDescription, testimonials } = getHomeContent();
  const resourceCount = getAllResources().length;

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
            <div className="shrink-0">
              <Image
                src="/images/cover.png"
                alt="UDL for Little Learners book cover"
                width={280}
                height={370}
                priority
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-display text-4xl font-extrabold leading-tight text-blue sm:text-5xl">
                UDL for Little Learners
              </h1>
              <p className="mt-2 font-display text-xl font-medium text-orange">
                {heroSubtitle}
              </p>
              <p className="mt-4 max-w-lg text-lg text-text-light">
                {heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/resources"
                  className="rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
                >
                  Explore Resources ({resourceCount})
                </Link>
                <Link
                  href="/book"
                  className="rounded-full border-2 border-orange px-6 py-3 text-center font-display font-bold text-orange transition hover:bg-orange hover:text-white"
                >
                  Get the Book
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-t border-border bg-white/60 py-16">
          <Container>
            <h2 className="text-center font-display text-2xl font-bold text-text">
              What Educators Are Saying
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <p className="italic text-text-light">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4">
                    <p className="font-display font-bold text-text">{t.author}</p>
                    <p className="text-sm text-text-light">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Quick CTA */}
      <section className="py-16">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-bold text-text">
            Ready to transform your classroom?
          </h2>
          <p className="mt-2 text-text-light">
            Explore practical strategies, bonus chapters, and hands-on activities.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/connect"
              className="rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark"
            >
              Book Jeff to Speak
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
```

**Step 3: Verify build**

```bash
npx next build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build Home page with hero, testimonials, and CTAs"
```

---

## Task 5: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Build About page**

Create `src/app/about/page.tsx`:

```tsx
import Image from "next/image";
import { Container } from "@/components/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jeff Horwitz",
  description:
    "Jeff Horwitz is a 20-year educator, UDL advocate, and author of UDL for Little Learners.",
};

export default function About() {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
          {/* Headshot */}
          <div className="mx-auto shrink-0 md:mx-0">
            <div className="relative h-72 w-72 overflow-hidden rounded-2xl bg-blue/10 shadow-lg">
              {/* Placeholder until headshot is processed */}
              <div className="flex h-full items-center justify-center text-center text-sm text-text-light">
                <p>Headshot<br />coming soon</p>
              </div>
              {/* Uncomment when headshot is ready:
              <Image
                src="/images/headshot.png"
                alt="Jeff Horwitz"
                fill
                className="object-cover"
              /> */}
            </div>
            <div className="mt-4 flex justify-center">
              <Image
                src="/images/hcg-logo.png"
                alt="Horwitz Consulting Group"
                width={120}
                height={120}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
              About Jeff Horwitz
            </h1>
            <div className="mt-6 space-y-4 text-text-light leading-relaxed">
              <p>
                Jeff is a 20-year educator and has been an administrator at independent schools
                in St. Louis since 2013. He is passionate that all children deserve a high-quality
                education and believes strongly in surrounding students with passionate adults that
                can provide a personalized, 21st-century education, with authentic learning
                experiences, and use technology as a tool.
              </p>
              <p>
                He believes that the social-emotional lives of children are equally as important as
                the academic and that empathy and collaboration are cornerstone skills for the
                future. Jeff holds a{" "}
                <strong className="text-text">Learning Designed Level 1 UDL and Level 2 UDL credential</strong>.
              </p>
              <p>
                Prior to becoming an administrator, Jeff taught kindergarten through third grade in
                public and private schools. He is passionate about providing students with
                opportunities for learning that will prepare them for the increasingly automated
                world we live in. He is skilled at using technology as a creation, communication,
                collaboration and teaching tool.
              </p>
              <p>
                Jeff is an advocate for Project Based Learning and Universal Design for Learning
                and has presented at many conferences and schools including{" "}
                <strong className="text-text">ISTE</strong>,{" "}
                <strong className="text-text">BLC</strong>, and{" "}
                <strong className="text-text">METC</strong>.
                His work has been included in publications and journals.
              </p>
              <p>
                Jeff enjoys collaborating with teachers on how to create equitable, authentic
                learning experiences, how to use technology to enhance their teaching, how to use
                student-centered techniques to prepare students for the world they will inherit,
                and how to engage parents in the process.
              </p>
              <p>
                As an administrator, Jeff has developed a 21st-century/vision-minded curriculum,
                instituted standards-based grading, written strategic plans, created and designed a
                Makerspace and curriculum, and managed change for the organization around these
                initiatives.
              </p>
              <p className="italic">
                When Jeff is not immersed in schools he is spending time with his two children,
                cooking, out on the golf course, or playing music with his friends.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
npx next build
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: build About page with Jeff's bio and headshot placeholder"
```

---

## Task 6: Resources Hub Page

**Files:**
- Create: `src/app/resources/page.tsx`
- Create: `src/components/ResourceCard.tsx`

**Step 1: Create ResourceCard component**

Create `src/components/ResourceCard.tsx`:

```tsx
import Link from "next/link";
import { Resource, RESOURCE_TYPE_LABELS } from "@/lib/types";

const TYPE_COLORS: Record<string, string> = {
  "bonus-chapter": "bg-pink/10 text-pink",
  "discussion-guide": "bg-orange/10 text-orange",
  template: "bg-green/10 text-green",
  reference: "bg-blue/10 text-blue",
  photo: "bg-yellow/10 text-yellow",
  video: "bg-pink/10 text-pink",
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const colorClass = TYPE_COLORS[resource.type] ?? "bg-blue/10 text-blue";

  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-blue/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-text group-hover:text-blue">
          {resource.title}
        </h3>
        {resource.downloadFile && (
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-text-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-light">
        {resource.description}
      </p>
      <div className="mt-auto pt-3">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}>
          {RESOURCE_TYPE_LABELS[resource.type]}
        </span>
        {resource.chapter && (
          <span className="ml-2 text-xs text-text-light">
            Chapter {resource.chapter}
          </span>
        )}
      </div>
    </Link>
  );
}
```

**Step 2: Create Resources hub page**

Create `src/app/resources/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { ResourceCard } from "@/components/ResourceCard";
import {
  Resource,
  ResourceType,
  RESOURCE_TYPE_LABELS,
  BOOK_PARTS,
} from "@/lib/types";

// This page needs to be a client component for the view toggle.
// We'll pass resources from a server wrapper.

export default function ResourcesPage() {
  // Resources will be loaded via a server component wrapper — see Step 3
  return null; // placeholder
}
```

Actually — since we need both server data loading and client interactivity, use this pattern:

Create `src/app/resources/page.tsx`:

```tsx
import { getAllResources } from "@/lib/resources";
import { ResourcesClient } from "./ResourcesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Downloadable guides, bonus chapters, templates, and activities for UDL for Little Learners.",
};

export default function ResourcesPage() {
  const resources = getAllResources();
  return <ResourcesClient resources={resources} />;
}
```

Create `src/app/resources/ResourcesClient.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { ResourceCard } from "@/components/ResourceCard";
import {
  Resource,
  ResourceType,
  RESOURCE_TYPE_LABELS,
  BOOK_PARTS,
} from "@/lib/types";

type ViewMode = "chapter" | "type";

export function ResourcesClient({ resources }: { resources: Resource[] }) {
  const [view, setView] = useState<ViewMode>("chapter");
  const [activeType, setActiveType] = useState<ResourceType | "all">("all");

  const typeKeys = Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[];
  const filteredByType =
    activeType === "all"
      ? resources
      : resources.filter((r) => r.type === activeType);

  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
          Resource Hub
        </h1>
        <p className="mt-2 text-text-light">
          Companion resources for <em>UDL for Little Learners</em>. Browse by
          chapter or filter by type.
        </p>

        {/* View toggle */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setView("chapter")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              view === "chapter"
                ? "bg-blue text-white"
                : "bg-white text-text border border-border hover:border-blue/30"
            }`}
          >
            By Chapter
          </button>
          <button
            onClick={() => setView("type")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              view === "type"
                ? "bg-blue text-white"
                : "bg-white text-text border border-border hover:border-blue/30"
            }`}
          >
            By Type
          </button>
        </div>

        {/* Chapter view */}
        {view === "chapter" && (
          <div className="mt-8 space-y-10">
            {BOOK_PARTS.map((part) => {
              const partResources = resources.filter((r) => r.part === part.part);
              if (partResources.length === 0) return null;
              return (
                <div key={part.part}>
                  <h2 className="font-display text-xl font-bold text-text">
                    Part {part.part}: {part.title}
                  </h2>
                  {part.chapters.map((ch) => {
                    const chapterResources = resources.filter(
                      (r) => r.chapter === ch.num
                    );
                    if (chapterResources.length === 0) return null;
                    return (
                      <div key={ch.num} className="mt-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-light">
                          Chapter {ch.num}: {ch.title}
                        </h3>
                        <div className="mt-2 grid gap-4 sm:grid-cols-2">
                          {chapterResources.map((r) => (
                            <ResourceCard key={r.slug} resource={r} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Bonus section */}
            {resources.filter((r) => r.part === "bonus").length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-text">
                  Bonus Materials
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {resources
                    .filter((r) => r.part === "bonus")
                    .map((r) => (
                      <ResourceCard key={r.slug} resource={r} />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Type view */}
        {view === "type" && (
          <div className="mt-6">
            {/* Type filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveType("all")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeType === "all"
                    ? "bg-blue text-white"
                    : "bg-white text-text border border-border hover:border-blue/30"
                }`}
              >
                All ({resources.length})
              </button>
              {typeKeys.map((type) => {
                const count = resources.filter((r) => r.type === type).length;
                if (count === 0) return null;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      activeType === type
                        ? "bg-blue text-white"
                        : "bg-white text-text border border-border hover:border-blue/30"
                    }`}
                  >
                    {RESOURCE_TYPE_LABELS[type]} ({count})
                  </button>
                );
              })}
            </div>

            {/* Filtered grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {filteredByType.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
```

**Step 3: Verify build**

```bash
npx next build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build Resources hub with chapter and type views"
```

---

## Task 7: Resource Detail Page

**Files:**
- Create: `src/app/resources/[slug]/page.tsx`
- Create: `src/components/MdxContent.tsx`

**Step 1: Create MDX renderer component**

Create `src/components/MdxContent.tsx`:

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-8 mb-3 font-display text-xl font-bold text-blue" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 mb-2 font-display text-lg font-semibold text-text" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-3 leading-relaxed text-text-light" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-text-light" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 text-text-light" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-text" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="border border-border bg-blue/5 px-3 py-2 text-left font-semibold text-text" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border border-border px-3 py-2 text-text-light" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
```

**Step 2: Create resource detail page**

Create `src/app/resources/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MdxContent } from "@/components/MdxContent";
import { ResourceCard } from "@/components/ResourceCard";
import { getAllResources, getResourceBySlug } from "@/lib/resources";
import { RESOURCE_TYPE_LABELS } from "@/lib/types";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description,
  };
}

export default async function ResourceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  // Related resources: same chapter or same part
  const all = getAllResources();
  const related = all
    .filter(
      (r) =>
        r.slug !== resource.slug &&
        (r.chapter === resource.chapter || r.part === resource.part)
    )
    .slice(0, 4);

  return (
    <section className="py-12">
      <Container>
        {/* Back link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-1 text-sm text-text-light hover:text-blue"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Resources
        </Link>

        {/* Header */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
              {RESOURCE_TYPE_LABELS[resource.type]}
            </span>
            {resource.chapter && (
              <span className="text-sm text-text-light">
                Chapter {resource.chapter}
                {resource.chapterTitle && `: ${resource.chapterTitle}`}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-text sm:text-4xl">
            {resource.title}
          </h1>
          <p className="mt-2 text-lg text-text-light">{resource.description}</p>
        </div>

        {/* Download button */}
        {resource.downloadFile && (
          <a
            href={resource.downloadFile}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-orange-dark"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        )}

        {/* Video embed or link */}
        {resource.videoUrl && (
          <div className="mt-6 aspect-video overflow-hidden rounded-xl">
            <iframe
              src={resource.videoUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {!resource.videoUrl && resource.driveUrl && (
          <a
            href={resource.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-blue hover:underline"
          >
            View on Google Drive
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* Content */}
        <div className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <MdxContent source={resource.content} />
        </div>

        {/* Related resources */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-text">
              Related Resources
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
```

**Step 3: Verify build**

```bash
npx next build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build Resource detail page with MDX rendering and PDF download"
```

---

## Task 8: Book Page

**Files:**
- Create: `src/app/book/page.tsx`

**Step 1: Build Book page**

Create `src/app/book/page.tsx`:

```tsx
import Image from "next/image";
import { Container } from "@/components/Container";
import { BOOK_PARTS } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Book",
  description:
    "UDL for Little Learners by Jeff Horwitz — practical strategies for early childhood educators. Published by Jossey-Bass.",
};

export default function BookPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
          <div className="mx-auto shrink-0 md:mx-0">
            <Image
              src="/images/cover.png"
              alt="UDL for Little Learners book cover"
              width={300}
              height={400}
              className="rounded-xl shadow-xl"
            />
            <div className="mt-6 flex flex-col gap-3">
              {/* Amazon link — placeholder until available */}
              <a
                href="#"
                className="block rounded-full bg-blue px-6 py-3 text-center font-display font-bold text-white shadow-md transition hover:bg-blue-dark"
              >
                Buy on Amazon
              </a>
              <p className="text-center text-xs text-text-light">
                Published by Jossey-Bass (Wiley)
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
              UDL for Little Learners
            </h1>
            <p className="mt-1 font-display text-lg font-medium text-orange">
              Practical Strategies for Early Childhood Educators
            </p>
            <p className="mt-4 text-text-light leading-relaxed">
              This book is designed for early childhood teachers (Pre-K through 2nd grade),
              instructional coaches, and school leaders. It walks through a typical school day —
              from arrival to dismissal — showing how Universal Design for Learning principles
              translate into practical, classroom-ready strategies. Pick the part of the day
              that&apos;s on your mind and dig in.
            </p>

            {/* Chapter overview */}
            <div className="mt-10 space-y-8">
              {BOOK_PARTS.map((part) => (
                <div key={part.part}>
                  <h2 className="font-display text-xl font-bold text-text">
                    Part {part.part}: {part.title}
                  </h2>
                  <div className="mt-3 space-y-2">
                    {part.chapters.map((ch) => (
                      <div
                        key={ch.num}
                        className="rounded-xl border border-border bg-white px-4 py-3"
                      >
                        <span className="font-display font-semibold text-blue">
                          Chapter {ch.num}:
                        </span>{" "}
                        <span className="text-text">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Coming soon */}
            <div className="mt-10 rounded-2xl border-2 border-dashed border-yellow bg-yellow/10 p-6 text-center">
              <h3 className="font-display text-lg font-bold text-text">
                Online Course Coming Soon
              </h3>
              <p className="mt-1 text-sm text-text-light">
                A companion course to go deeper with UDL for Little Learners is in development.
                Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
npx next build
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: build Book page with chapter overview and buy CTA"
```

---

## Task 9: Connect Page

**Files:**
- Create: `src/app/connect/page.tsx`

**Step 1: Build Connect page with contact form**

Create `src/app/connect/page.tsx`:

```tsx
"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/Container";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@edtech_jeff",
    href: "https://www.instagram.com/edtech_jeff",
  },
  {
    label: "X (Twitter)",
    handle: "@mrteachersir",
    href: "https://x.com/mrteachersir",
  },
  {
    label: "LinkedIn",
    handle: "Jeff Horwitz",
    href: "https://www.linkedin.com/in/jeff-horwitz-302b1326",
  },
  {
    label: "Bio Site",
    handle: "bio.site/edtech_jeff",
    href: "https://bio.site/edtech_jeff",
  },
];

const REQUEST_TYPES = ["Speaking", "Podcast", "Consulting", "Other"];

export default function ConnectPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Formspree endpoint — replace FORM_ID with actual Formspree form ID
      const res = await fetch("https://formspree.io/f/FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-12">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-blue sm:text-4xl">
          Connect with Jeff
        </h1>
        <p className="mt-2 text-text-light">
          Interested in having Jeff speak at your school, conference, or podcast?
          Reach out below.
        </p>

        <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Contact form */}
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-text">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-text">
                  I&apos;m interested in...
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                >
                  <option value="">Select an option</option>
                  {REQUEST_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-text focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-blue px-6 py-3 font-display font-bold text-white shadow-md transition hover:bg-blue-dark disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "sent" && (
                <p className="text-sm font-medium text-green">
                  Message sent! Jeff will be in touch.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-pink">
                  Something went wrong. Please try again or email Jeff directly.
                </p>
              )}
            </form>
          </div>

          {/* Social links */}
          <div className="lg:w-72">
            <h2 className="font-display text-xl font-bold text-text">
              Find Jeff Online
            </h2>
            <div className="mt-4 space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 transition hover:border-blue/30 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-text">{link.label}</p>
                    <p className="text-xs text-text-light">{link.handle}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-text">
                Consulting
              </h3>
              <a
                href="https://bio.site/edtech_jeff"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm text-blue hover:underline"
              >
                Horwitz Consulting Group
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

Note: The `metadata` export needs to be in a separate server file since this is a client component. Add `src/app/connect/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Book Jeff Horwitz to speak at your school, conference, or podcast about UDL for early childhood.",
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**Step 2: Verify build**

```bash
npx next build
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: build Connect page with contact form and social links"
```

---

## Task 10: Content Migration — Convert Resources to MDX + PDF

**Files:**
- Create: All MDX files under `content/resources/`
- Create: All PDFs under `public/resources/`
- Create: `scripts/convert-docx.py` (helper script)

**Step 1: Create Python conversion script**

Create `scripts/convert-docx.py` — this reads Word docs and outputs both MDX content and PDF. Install dependencies:

```bash
pip install python-docx docx2pdf
```

This task is semi-manual because each resource needs correct frontmatter. The process:

1. Extract text from each `.docx` using python-docx
2. Format as MDX with correct frontmatter
3. Convert each `.docx` to PDF for download
4. Place PDFs in `public/resources/`

Create all 13 MDX files in `content/resources/` with content extracted from the Word docs. The executive-skills.mdx from Task 2 serves as the template.

For each resource, the MDX file needs:
- Correct frontmatter (title, slug, chapter, part, type, description, downloadFile, order)
- Content converted from the Word doc to Markdown

For PDF generation: convert each `.docx` to PDF and place in `public/resources/`. The Daily Transition Map is already a PDF — just copy it.

**Step 2: Create all MDX resource files**

Files to create (using the Word doc content extracted earlier):
- `content/resources/bonus/discussion-and-activities.mdx`
- `content/resources/bonus/specials.mdx`
- `content/resources/bonus/nap.mdx`
- `content/resources/bonus/executive-skills.mdx` (already done)
- `content/resources/ch08-centers/types-of-centers.mdx`
- `content/resources/ch08-centers/centers-resources.mdx`
- `content/resources/ch08-centers/task-cards.mdx`
- `content/resources/ch10-morning-meeting/engagement-games.mdx`
- `content/resources/ch12-reading-phonics/sample-phonics-block.mdx`
- `content/resources/ch12-reading-phonics/launch-explore-discuss.mdx` (actually Ch 15 Math)
- `content/resources/ch04-transitions/daily-transition-map.mdx`
- `content/resources/ch07-emotional-literacy/calm-spaces.mdx`
- `content/resources/general/classroom-tour.mdx`

Each file follows the frontmatter schema from `src/lib/types.ts`.

**Step 3: Generate PDFs and copy to public/resources/**

```bash
mkdir -p public/resources
# Convert each .docx to PDF using python or LibreOffice
# Copy the transition map PDF directly
cp "/c/Users/bhorw/Downloads/Little Learners Resources/Little Learners Resources/Copy of 🌟 Daily Transition Map & Reflection 2.pdf" public/resources/daily-transition-map.pdf
```

**Step 4: Verify all resources load**

```bash
npx next build
```

Should show 13 resources loading with no errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add all 13 resources as MDX content with PDF downloads"
```

---

## Task 11: QR Code Generation

**Files:**
- Create: `public/qr-code.svg`, `public/qr-code.png`

**Step 1: Generate QR code**

```bash
pip install qrcode[pil]
python -c "
import qrcode
import qrcode.image.svg

# SVG version
factory = qrcode.image.svg.SvgPathImage
img = qrcode.make('https://udlforlittlelearners.com/resources', image_factory=factory, box_size=20, border=2)
img.save('public/qr-code.svg')

# PNG version (high-res for print)
img_png = qrcode.make('https://udlforlittlelearners.com/resources', box_size=20, border=2)
img_png.save('public/qr-code.png')
print('QR codes generated: public/qr-code.svg and public/qr-code.png')
"
```

**Step 2: Commit**

```bash
git add public/qr-code.*
git commit -m "feat: generate QR code pointing to resources page"
```

---

## Task 12: Vercel Deployment + GitHub Repo

**Step 1: Create GitHub repo**

```bash
cd C:\Users\bhorw\projects\udl-little-learners
gh repo create AH-Datalytics/udl-little-learners --private --source=. --push
```

**Step 2: Deploy to Vercel**

```bash
npx vercel --yes
```

Or link via Vercel dashboard to the GitHub repo for auto-deploy on push.

**Step 3: Verify deployment**

Visit the Vercel preview URL. Check:
- All 5 pages load
- Resources hub shows 13 resources
- Resource detail pages render MDX content
- PDF download links work
- Navigation works on mobile and desktop
- Contact form renders (Formspree won't work until form ID is configured)

**Step 4: Commit any deployment config**

```bash
git add -A
git commit -m "chore: add Vercel deployment config"
```

---

## Task 13: Final Polish

**Step 1: Process Jeff's headshot**

Remove background from the provided photo (use remove.bg or similar tool), save as `public/images/headshot.png`, and uncomment the Image component in the About page.

**Step 2: Add CLAUDE.md**

Create `CLAUDE.md` at project root with project conventions, build commands, and content editing instructions for future sessions.

**Step 3: Final build verification**

```bash
npx next build
```

**Step 4: Commit and push**

```bash
git add -A
git commit -m "chore: add headshot, CLAUDE.md, final polish"
git push
```

---

## Summary

| Task | Description | Key Files |
|---|---|---|
| 1 | Project scaffolding | package.json, globals.css, layout.tsx |
| 2 | Content infrastructure | lib/resources.ts, lib/types.ts, test MDX |
| 3 | Shared components | Nav.tsx, Footer.tsx, Container.tsx |
| 4 | Home page | app/page.tsx, content/pages/home.mdx |
| 5 | About page | app/about/page.tsx |
| 6 | Resources hub | app/resources/page.tsx, ResourcesClient.tsx, ResourceCard.tsx |
| 7 | Resource detail | app/resources/[slug]/page.tsx, MdxContent.tsx |
| 8 | Book page | app/book/page.tsx |
| 9 | Connect page | app/connect/page.tsx |
| 10 | Content migration | All MDX files + PDFs |
| 11 | QR code | public/qr-code.svg, public/qr-code.png |
| 12 | Deployment | GitHub repo + Vercel |
| 13 | Final polish | Headshot, CLAUDE.md |
