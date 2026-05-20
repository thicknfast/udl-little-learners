# UDL for Little Learners — Companion Website

## Overview

Companion Resource Hub for Jeff Horwitz's book *UDL for Little Learners: Practical Strategies for Early Childhood Educators* (Jossey-Bass/Wiley).

- **Live URL:** https://udl-little-learners.vercel.app
- **Target Domain:** udlforlittlelearners.com (not yet purchased)
- **Deployed:** Vercel (currently under `ahdatalytics` org — to be transferred to Jeff)
- **QR Code:** `public/qr-code.svg` / `public/qr-code.png` → https://udlforlittlelearners.com/resources

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 4 (inline theme in `src/app/globals.css`) |
| Content | MDX files in `content/` — no external CMS |
| MDX rendering | next-mdx-remote v6 (React Server Components) |
| Frontmatter | gray-matter |
| Fonts | Nunito (headings, via @fontsource) + Inter (body, via @fontsource) |
| Deployment | Vercel (free tier) |
| Contact form | Formspree (placeholder — needs real FORM_ID) |

---

## Commands

```bash
npm install              # install dependencies
npm run dev              # start dev server (http://localhost:3000)
npx next build           # production build (also runs TypeScript check)
npm run lint             # run ESLint
vercel --prod            # deploy to Vercel production (requires Vercel CLI)
```

---

## Project Structure

```
udl-little-learners/
├── content/                    # All editable content lives here
│   ├── pages/
│   │   └── home.mdx           # Hero text + testimonials for homepage
│   └── resources/              # Resource MDX files organized by chapter
│       ├── bonus/              # Bonus materials (not tied to specific chapter)
│       ├── ch03-community/     # Chapter 3: Community and Connections
│       ├── ch04-transitions/   # Chapter 4: Transitions
│       ├── ch05-reflection/    # Chapter 5: Reflection
│       ├── ch07-emotional-literacy/  # Chapter 7: Emotional Literacy
│       ├── ch08-centers/       # Chapter 8: Centers
│       ├── ch10-morning-meeting/     # Chapter 10: Morning Meeting
│       ├── ch12-reading-phonics/     # Chapter 12: Reading, Phonics and Literacy
│       ├── ch13-writing/       # Chapter 13: Writing
│       ├── ch15-math/          # Chapter 15: Math
│       ├── ch17-closing-circle/      # Chapter 17: Closing Circle and Dismissal
│       └── general/            # General resources (not chapter-specific)
├── public/
│   ├── images/                 # Site images
│   │   ├── cover.png           # Book cover image
│   │   ├── headshot.jpg        # Author headshot
│   │   ├── hcg-logo.png        # HCG consulting logo
│   │   └── classroom/          # Classroom photos
│   │       └── calm-spaces.jpg
│   ├── resources/              # Downloadable PDFs
│   │   ├── discussion-and-activities.pdf
│   │   ├── specials.pdf
│   │   ├── nap-rest-time.pdf
│   │   ├── executive-skills.pdf
│   │   ├── types-of-centers.pdf
│   │   ├── centers-resources.pdf
│   │   ├── task-cards.pdf
│   │   ├── engagement-games.pdf
│   │   ├── sample-phonics-block.pdf
│   │   ├── launch-explore-discuss.pdf
│   │   └── daily-transition-map.pdf
│   ├── qr-code.svg             # QR code → /resources (for print in book)
│   └── qr-code.png
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Nav + Footer wrapper)
│   │   ├── globals.css         # Tailwind theme + font imports
│   │   ├── page.tsx            # Home page
│   │   ├── about/page.tsx      # About page
│   │   ├── book/page.tsx       # Book page
│   │   ├── connect/            # Connect page (contact form)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── resources/
│   │       ├── page.tsx        # Resources listing (server)
│   │       ├── ResourcesClient.tsx  # Resources client component (view toggle, filters)
│   │       └── [slug]/page.tsx      # Individual resource detail (SSG)
│   ├── components/
│   │   ├── Container.tsx       # Max-width content wrapper
│   │   ├── Footer.tsx          # Site footer
│   │   ├── MdxContent.tsx      # MDX renderer component
│   │   ├── Nav.tsx             # Navigation bar
│   │   └── ResourceCard.tsx    # Resource card component
│   └── lib/
│       ├── resources.ts        # Resource loading/sorting logic
│       └── types.ts            # TypeScript types + book structure
├── docs/plans/                 # Design and implementation docs
├── scripts/                    # Build-time utility scripts (PDF conversion, etc.)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home — hero with book cover, intro, testimonials |
| `/about` | `src/app/about/page.tsx` | Author bio, headshot, credentials, HCG logo |
| `/resources` | `src/app/resources/page.tsx` | Resource Hub — browse by chapter or filter by type |
| `/resources/[slug]` | `src/app/resources/[slug]/page.tsx` | Individual resource detail + download/link |
| `/book` | `src/app/book/page.tsx` | Book description, chapter overview, buy links |
| `/connect` | `src/app/connect/page.tsx` | Contact form (speaking, podcast, consulting) + social links |

---

## Content System

All content is file-based MDX. No database, no external CMS. Edit the files, build, deploy.

### Resource Frontmatter Schema

Every resource MDX file in `content/resources/` must have this frontmatter:

```yaml
---
title: "Resource Title"                # Display title
slug: "url-slug"                       # URL path — must be unique across all resources
chapter: 8                             # Chapter number (integer) or null for bonus/general
chapterTitle: "Centers"                # Chapter name or null
part: "2"                              # Book part: "1" | "2" | "3" | "bonus"
type: "reference"                      # One of: bonus-chapter | discussion-guide | template | reference | photo | video
description: "Brief description"       # Shown on cards and as page subtitle
downloadFile: "/resources/file.pdf"    # Path to PDF in public/resources/ — or null
videoUrl: null                         # YouTube/Vimeo embed URL — or null
driveUrl: null                         # Google Drive link — or null
externalUrl: null                      # Any external URL (Instagram, Canva, Google Docs, websites) — or null
order: 1                               # Sort order within the chapter/section
featured: true                         # Optional — shows resource in "Featured" section at top of /resources
---

MDX body content goes here. Supports markdown headings, lists, bold, links, etc.
```

### Resource Types

| Type key | Display label | Used for |
|---|---|---|
| `bonus-chapter` | Bonus Chapters | Full bonus chapters (Specials, Nap) |
| `discussion-guide` | Discussion & Activities | Study guide with reflection questions |
| `template` | Templates & Lesson Plans | Google Docs, Slides, printable templates |
| `reference` | Reference Sheets | Websites, book lists, anchor charts, guides |
| `photo` | Photos & Classroom Examples | Classroom photos |
| `video` | Videos | YouTube, Instagram reels, video walkthroughs |

### Resource Link Types

Resources can link to content in four ways (all optional, use whichever applies):

| Field | Renders as | When to use |
|---|---|---|
| `downloadFile` | Orange "Download PDF" button | For PDFs hosted in `public/resources/` |
| `externalUrl` | Blue "Open Resource" button | For any external link (Google Docs, Instagram, Canva, websites) |
| `videoUrl` | Embedded iframe player | For YouTube/Vimeo embeds |
| `driveUrl` | "View on Google Drive" text link | For Google Drive files/folders |

A resource can have multiple link types (e.g., both a downloadFile PDF and an externalUrl to the editable Google Doc version).

### Book Structure

The book has 3 parts + bonus materials. This structure is defined in `src/lib/types.ts` (`BOOK_PARTS`):

- **Part 1: Background** — Ch 1 (What is UDL?), Ch 2 (Designing the Environment), Ch 3 (Community and Connections)
- **Part 2: Embedded Practices** — Ch 4 (Transitions), Ch 5 (Reflection), Ch 6 (Small Group Instruction), Ch 7 (Emotional Literacy), Ch 8 (Centers)
- **Part 3: From the Day** — Ch 9 (Arrival), Ch 10 (Morning Meeting), Ch 11 (Calendar), Ch 12 (Reading/Phonics/Literacy), Ch 13 (Writing), Ch 14 (Recess), Ch 15 (Math), Ch 16 (Read Alouds), Ch 17 (Closing Circle)
- **Bonus** — Discussion Q&A, Specials chapter, Nap chapter, Executive Skills reference

### How to Add a New Resource

1. Create a `.mdx` file in the appropriate `content/resources/chXX-*/` directory (or create a new directory if the chapter doesn't have one yet — use pattern `chXX-short-name/`)
2. Fill in the frontmatter (copy an existing resource as a template)
3. Write the MDX body (a brief description + usage tips)
4. If it's a downloadable PDF, place the PDF in `public/resources/`
5. Run `npx next build` to verify it compiles
6. Deploy with `vercel --prod`

### How to Edit Homepage Content

Edit `content/pages/home.mdx` for testimonials and hero text.

### Sort Order

Resources are sorted by: **featured first → part (1, 2, 3, bonus) → chapter number → order field**. The `featured` flag pins a resource to the "Featured Resource" section at the very top of the resources page.

---

## Design

### Color Palette (from book cover)

| Name | Hex | CSS Variable | Usage |
|---|---|---|---|
| Blue | `#3B82C4` | `--color-blue` | Headers, buttons, links |
| Blue Dark | `#2B6299` | `--color-blue-dark` | Blue hover states |
| Orange | `#E8853D` | `--color-orange` | CTAs, download buttons, highlights |
| Orange Dark | `#D06E28` | `--color-orange-dark` | Orange hover states |
| Green | `#5BA847` | `--color-green` | Template badges |
| Yellow | `#F5C242` | `--color-yellow` | Photo badges, warmth accents |
| Pink | `#E05A6D` | `--color-pink` | Bonus/video badges |
| Cream | `#FDF8F0` | `--color-cream` | Page background |
| Text | `#2D3748` | `--color-text` | Body text |
| Text Light | `#64748B` | `--color-text-light` | Secondary text |
| Border | `#E2D9CC` | `--color-border` | Card/section borders |

### Typography

- **Headings:** Nunito (font-display) — weights 400, 600, 700, 800
- **Body:** Inter (font-body) — weights 400, 500, 600

### Style

Playful, warm, early-childhood classroom feel. Rounded corners on cards/buttons, soft shadows, cream background. Matches the book cover aesthetic.

---

## Current Resources (42 total)

### Bonus Materials (4)
- Discussion Questions and Activities (PDF) — **FEATURED** (appears at top)
- Bonus Chapter: Specials (PDF)
- Bonus Chapter: Nap/Rest Time (PDF)
- Executive Skills Reference (PDF)

### Chapter 3: Community and Connections (4)
- Video Classroom Walkthrough (Google Drive video)
- Classroom Gathering Routines (Instagram reel)
- Early Childhood Interest Inventory (Canva template)
- CASEL Signature Practices Playbook (website)

### Chapter 4: Transitions (3)
- Daily Transition Map and Reflection (PDF + Google Doc + Google Drive)
- Executive Function Blog Post (Novak Education blog)
- Goblin Tools Video Walkthrough (Instagram reel)

### Chapter 5: Reflection (1)
- Collection of Reflection Activities (Google Drive folder)

### Chapter 7: Emotional Literacy (6)
- Calm Spaces Photo Gallery (on-page photos)
- Give Spark Check-In Routines (Instagram)
- Give Spark Check-In Samples (Canva)
- Emotional Regulation Anchor Charts (Instagram)
- Calm Corner Book List — The Pawsitive Counselor (website)
- Calm-Down Corner Guide — We Are Teachers (website)

### Chapter 8: Centers (6)
- Types of Centers and Activities (PDF)
- Centers and Stations Resources (PDF)
- Task Cards (PDF — 11 center types)
- Communication Buttons — Bunny Example (YouTube)
- Speech Recordable Buttons (Amazon)
- Task Card Examples (Google Doc)

### Chapter 10: Morning Meeting (3)
- Engagement Games (PDF — also covers Ch 17)
- Developmental Milestone Chart (Responsive Classroom PDF)
- Choice Greeting Routine (Instagram reel)

### Chapter 12: Reading, Phonics and Literacy (5)
- Sample 30-Minute Phonics Block (PDF)
- UFLI-Aligned Center Structure (Instagram)
- Student Data Tracker (Google Doc)
- Movement-Based Literacy Centers (Instagram reel)
- Menu of Station Ideas (Google Doc)

### Chapter 13: Writing (4)
- Clothespin Fine Motor Activity (Instagram reel)
- Q-Tip Fine Motor Activity (Instagram reel)
- Fine Motor Menu (Google Doc)
- Graphic Organizer Templates (Google Slides)

### Chapter 15: Math (4)
- Launch, Explore, Discuss Framework (PDF)
- Number Talk Images and Templates (website)
- Notice and Wonder Sample Lessons (NCTM website)
- Problem Solving Work Mats (Google Drive folder)

### Chapter 17: Closing Circle and Dismissal (1)
- Opening and Closing Songs (Storytime Katie website)

### General (1)
- JK Classroom Tour Video (Google Drive)

---

## Deployment

### Current Setup

The site is deployed on Vercel under the `ahdatalytics` org account. There is no GitHub repo — deploys are done manually via `vercel --prod` from the project directory.

### To Transfer to a New Vercel Account

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. From the project directory, run `vercel` and follow prompts to link to the new account
4. Run `vercel --prod` to deploy
5. In Vercel dashboard, add custom domain `udlforlittlelearners.com` and configure DNS

### To Set Up a GitHub Repo (Optional)

1. Create a repo on GitHub
2. `git remote add origin <repo-url>`
3. `git push -u origin master`
4. In Vercel dashboard, import the GitHub repo for automatic deploys on push

---

## TODO — Remaining Setup Items

- [ ] **Formspree:** Replace `FORM_ID` placeholder in `src/app/connect/page.tsx` with a real Formspree form ID (create free account at formspree.io, create a form, copy the ID)
- [ ] **Amazon link:** Replace the placeholder Amazon buy link in `src/app/book/page.tsx` with the actual book listing URL
- [ ] **Testimonials:** Replace placeholder testimonials in `content/pages/home.mdx` with real reviewer quotes
- [ ] **Headshot:** Process `public/images/headshot.jpg` with background removal for cleaner look (optional)
- [ ] **Domain:** Purchase `udlforlittlelearners.com` and point DNS to Vercel (add as custom domain in Vercel dashboard)
- [ ] **Vercel transfer:** Transfer project from ahdatalytics Vercel org to Jeff's own Vercel account
- [ ] **GitHub repo:** Set up a GitHub repo if desired for version control and automatic deploys

---

## Key Files Quick Reference

| What | Where |
|---|---|
| Theme colors & fonts | `src/app/globals.css` |
| Book chapter structure | `src/lib/types.ts` (`BOOK_PARTS`) |
| Resource type definitions | `src/lib/types.ts` (`ResourceType`, `RESOURCE_TYPE_LABELS`) |
| Resource loading & sorting | `src/lib/resources.ts` |
| Homepage hero & testimonials | `content/pages/home.mdx` |
| Navigation links | `src/components/Nav.tsx` |
| Footer content | `src/components/Footer.tsx` |
| Resource card appearance | `src/components/ResourceCard.tsx` |
| Resource detail page layout | `src/app/resources/[slug]/page.tsx` |
| About page bio text | `src/app/about/page.tsx` |
| Book page content | `src/app/book/page.tsx` |
| Contact form | `src/app/connect/page.tsx` |
| QR code files | `public/qr-code.svg`, `public/qr-code.png` |
