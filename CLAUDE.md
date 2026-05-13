@AGENTS.md

# UDL for Little Learners — Companion Website

## Overview

Companion Resource Hub for Jeff Horwitz's book *UDL for Little Learners: Practical Strategies for Early Childhood Educators* (Jossey-Bass/Wiley).

**Domain:** udlforlittlelearners.com
**Deployed:** Vercel (ahdatalytics org)
**QR Code:** `public/qr-code.svg` / `public/qr-code.png` → https://udlforlittlelearners.com/resources

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (inline theme in globals.css)
- next-mdx-remote (v6, RSC) for rendering MDX content
- gray-matter for frontmatter parsing
- Vercel (free tier)
- Formspree for contact form (FORM_ID placeholder — needs real ID)

## Build

```bash
npx next build          # production build
npm run dev             # dev server
```

## Content System

All content is file-based MDX in `content/`:

```
content/
  resources/           # Resource MDX files organized by chapter
    bonus/             # Bonus materials (not tied to specific chapter)
    ch04-transitions/
    ch07-emotional-literacy/
    ch08-centers/
    ch10-morning-meeting/
    ch12-reading-phonics/
    ch15-math/
    general/           # General resources (video, etc.)
  pages/
    home.mdx           # Hero text + testimonials
```

### Adding a Resource

1. Create `.mdx` file in the appropriate `content/resources/` subdirectory
2. Add frontmatter matching `ResourceFrontmatter` type (see `src/lib/types.ts`)
3. Place PDF in `public/resources/`
4. Build and deploy

### Resource Frontmatter Schema

```yaml
---
title: "Resource Title"
slug: "url-slug"
chapter: 8                    # number or null for bonus
chapterTitle: "Centers"       # or null
part: "2"                     # "1" | "2" | "3" | "bonus"
type: "reference"             # bonus-chapter | discussion-guide | template | reference | photo | video
description: "Brief description"
downloadFile: "/resources/slug.pdf"  # or null
videoUrl: null                # YouTube/Vimeo embed URL
driveUrl: null                # Google Drive link
order: 1                      # sort order within section
---
```

## Pages

| Route | File | Type |
|---|---|---|
| `/` | `src/app/page.tsx` | Server (reads home.mdx) |
| `/about` | `src/app/about/page.tsx` | Server |
| `/resources` | `src/app/resources/page.tsx` → `ResourcesClient.tsx` | Server+Client |
| `/resources/[slug]` | `src/app/resources/[slug]/page.tsx` | Server (SSG) |
| `/book` | `src/app/book/page.tsx` | Server |
| `/connect` | `src/app/connect/page.tsx` | Client (form) |

## Design

- **Colors:** Blue `#3B82C4`, Orange `#E8853D`, Green `#5BA847`, Yellow `#F5C242`, Pink `#E05A6D`, Cream bg `#FDF8F0`
- **Fonts:** Nunito (display/headings), Inter (body)
- **Style:** Playful, warm, matches book cover aesthetic

## TODO

- [ ] Replace Formspree `FORM_ID` in `src/app/connect/page.tsx` with real form ID
- [ ] Replace Amazon buy link placeholder in `src/app/book/page.tsx`
- [ ] Replace placeholder testimonials in `content/pages/home.mdx`
- [ ] Process headshot with background removal (currently has background)
- [ ] Jeff purchases udlforlittlelearners.com and points DNS to Vercel
- [ ] Set up GitHub repo when ready
