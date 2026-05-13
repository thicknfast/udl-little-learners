# UDL for Little Learners — Companion Website Design

**Date:** 2026-05-13
**Domain:** udlforlittlelearners.com
**Author:** Jeff Horwitz
**Publisher:** Jossey-Bass (Wiley)
**Book:** *UDL for Little Learners: Practical Strategies for Early Childhood Educators*

---

## Overview

Companion "Resource Hub" website for Jeff Horwitz's book. The book references this hub ~10 times with placeholder URLs/QR codes. A QR code pointing to `https://udlforlittlelearners.com/resources` is needed within ~1 month for the next publisher submission.

The site serves as: resource download hub, author platform, speaking/contact portal, and book marketing page. Jeff needs lightweight CMS control via MDX files.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Content:** MDX files in repo (no external CMS)
- **PDF hosting:** Static files in `public/resources/`
- **Deployment:** Vercel (free tier)
- **Domain:** udlforlittlelearners.com (Jeff to purchase, point to Vercel)

---

## Site Map

### Navigation (5 items)

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero with book cover, tagline, "Get the Book" CTA, testimonials section |
| About | `/about` | Jeff's bio (background-removed headshot), credentials, UDL journey, HCG logo |
| Resources | `/resources` | Main hub — browse by chapter OR filter by resource type |
| Book | `/book` | Where to buy (Amazon), chapter overview, what's inside |
| Connect | `/connect` | Speaking/podcast requests, contact form, social links |

### Dynamic Route

| Page | Route | Purpose |
|---|---|---|
| Resource Detail | `/resources/[slug]` | Individual resource: rendered content preview + PDF download button |

---

## Page Details

### Home (`/`)

- **Hero:** Book cover image (large), title, subtitle "Practical Strategies for Early Childhood Educators", "Get the Book" button (links to Amazon), "Explore Resources" button (links to `/resources`)
- **Quick intro:** 2-3 sentences about what the Resource Hub is and how to use it
- **Testimonials section:** Scrolling quote cards with reviewer name/title. Editable via MDX.
- **Footer CTAs:** Links to Connect page, social media icons

### About (`/about`)

- **Headshot:** Background-removed photo, styled like ahdatalytics.com/about
- **Bio:** Full bio text (provided), emphasizing 20-year educator, UDL credentials (Level 1 + Level 2), administrator at independent schools, Novak Education connection
- **HCG logo** with brief description of consulting work
- **Conference/speaking highlights:** ISTE, BLC, METC, publications

### Resources (`/resources`)

**Dual navigation:**

1. **By Chapter (default view):** Grouped by book part
   - Part 1: Background (Ch 1–3)
   - Part 2: Embedded Practices (Ch 4–8)
   - Part 3: From the Day (Ch 9–17)
   - Bonus Materials
   - Each chapter card shows: chapter number, title, resource count. Click to expand/see resources.

2. **By Type (toggle/filter view):**
   - Bonus Chapters
   - Discussion & Activities Guide
   - Templates & Lesson Plans
   - Reference Sheets
   - Photos & Classroom Examples
   - Videos (when available)

Each resource card: title, type badge, brief description, chapter reference, download icon. Click → resource detail page.

### Resource Detail (`/resources/[slug]`)

- **Header:** Resource title, type badge, associated chapter(s)
- **Content preview:** Rendered MDX content (the resource text, viewable on page)
- **Download button:** "Download PDF" — prominent, sticky on scroll
- **Related resources:** Links to other resources from the same chapter
- **Back link:** "← Back to Resources"

### Book (`/book`)

- **Book cover** (large)
- **Description:** What the book covers, who it's for
- **Chapter overview:** Collapsible list of all 16 chapters with brief descriptions (Part 1/2/3 structure)
- **Buy links:** Amazon (primary), potentially other retailers
- **"Coming Soon" section:** Placeholder for upcoming course

### Connect (`/connect`)

- **Speaking/podcast requests:** Simple contact form (name, email, message, type: speaking/podcast/other)
- **Social links:** Instagram (@edtech_jeff), X (@mrteachersir), LinkedIn
- **Novak Education link**
- **HCG link**
- **Embed or link to bio.site/edtech_jeff**

---

## Visual Design

### Direction: Match the Book Cover

Playful, warm, early-childhood classroom feel. The book cover has crayon-style lettering, bright colors, kids doing art on a cream background.

### Color Palette (extracted from book cover)

| Role | Color | Usage |
|---|---|---|
| Primary Blue | `#3B82C4` | Headers, buttons, links |
| Accent Orange | `#E8853D` | CTAs, highlights, badges |
| Accent Green | `#5BA847` | Success states, type badges |
| Accent Yellow | `#F5C242` | Warmth accents, stars, callouts |
| Accent Red/Pink | `#E05A6D` | Alert accents, emphasis |
| Background | `#FDF8F0` | Warm cream (not pure white) |
| Text | `#2D3748` | Dark gray for readability |

*Note: Exact hex values to be confirmed during implementation by sampling the cover image.*

### Typography

- **Display/headings:** A friendly, rounded font (e.g., Fredoka, Nunito, or Baloo 2) — echoing the playful book cover style
- **Body:** Clean sans-serif (e.g., Inter or Source Sans 3) for readability
- **Monospace:** Not needed (no code on this site)

### Design Elements

- Rounded corners on cards and buttons
- Soft shadows
- Subtle paper/crayon texture accents (CSS, not heavy images)
- Book cover as hero image
- Classroom photos (calm spaces, etc.) used throughout
- Illustrated dividers or section accents inspired by the cover's art style

---

## Content Model (MDX)

### Directory Structure

```
content/
  resources/
    ch04-transitions/
      goblin-tools-walkthrough.mdx
      daily-transition-map.mdx
    ch07-emotional-literacy/
      calm-spaces.mdx
    ch08-centers/
      types-of-centers.mdx
      task-cards.mdx
      centers-resources.mdx
    ch10-morning-meeting/
      engagement-games.mdx
    ch12-reading-phonics/
      sample-phonics-block.mdx
      launch-explore-discuss.mdx
    ch17-closing-circle/
      engagement-games-closing.mdx
    bonus/
      discussion-and-activities.mdx
      specials.mdx
      nap.mdx
      executive-skills.mdx
  pages/
    home.mdx          (testimonials, hero text)
    about.mdx          (bio, credentials)
    book.mdx           (chapter descriptions, buy links)
    connect.mdx        (contact info, form config)
public/
  resources/           (PDF downloads)
  images/
    cover.png
    headshot.png
    hcg-logo.png
    classroom/         (calm spaces photo, etc.)
```

### Resource Frontmatter

```yaml
---
title: "Discussion Questions and Activities"
slug: "discussion-and-activities"
chapter: null              # null for bonus, number for chapter-specific
chapterTitle: null
part: "bonus"
type: "discussion-guide"   # bonus-chapter | discussion-guide | template | reference | photo | video
description: "Professional development study guide with reflection questions and activities for all 16 chapters."
downloadFile: "/resources/discussion-and-activities.pdf"
videoUrl: null             # YouTube/Vimeo embed URL (future)
driveUrl: null             # Google Drive link (fallback for video)
order: 1                   # Sort order within chapter/section
---
```

### Resource Types (for filtering)

| Type key | Display label |
|---|---|
| `bonus-chapter` | Bonus Chapters |
| `discussion-guide` | Discussion & Activities |
| `template` | Templates & Lesson Plans |
| `reference` | Reference Sheets |
| `photo` | Photos & Classroom Examples |
| `video` | Videos |

---

## Initial Resource Inventory

Resources to include at launch, mapped from Jeff's materials:

| Resource | Chapter | Type | Source File |
|---|---|---|---|
| Discussion Questions and Activities | All (bonus) | discussion-guide | `UDL for Little Learners Bonus - Discussion and Activities.docx` |
| Bonus Chapter: Specials | Bonus | bonus-chapter | `UDL for Little Learners Bonus - 🎨 Specials.docx` |
| Bonus Chapter: Nap/Rest Time | Bonus | bonus-chapter | `UDL for Little Learners Bonus -😴 Nap.docx` |
| Executive Skills Reference | Bonus | reference | `UDL for Little Learners Bonus - Executive Skills.docx` |
| Types of Centers | Ch 8 | reference | `UDL for Little Learners - Types of Centers.docx` |
| Centers & Stations Resources | Ch 8 | reference | `Centers Resources.docx` |
| Task Cards (11 center types) | Ch 8 | template | `Task Cards.docx` |
| Engagement Games | Ch 10 + Ch 17 | reference | `Engagement Games Resource.docx` |
| Launch, Explore, Discuss Framework | Ch 15 (Math) | template | `Launch, Explore, Discuss Resource.docx` |
| Sample 30-Min Phonics Block | Ch 12 | template | `Sample 30-Minute Phonics Block.docx` |
| Daily Transition Map & Reflection | Ch 4 | template | `Copy of 🌟 Daily Transition Map & Reflection 2.pdf` |
| Calm Spaces Photo | Ch 7 | photo | `Calm Spaces/` folder |
| JK Classroom Tour Video | General | video | `Copy of JK Classroom Tour - 2019.mov` (link only, pending permissions) |

**13 resources at launch.**

---

## Video Strategy

- Build embed support for YouTube/Vimeo URLs in resource frontmatter (`videoUrl` field)
- For now, videos link to Google Drive (`driveUrl` field)
- When Jeff gets permission and uploads to YouTube, swap the URL in frontmatter

---

## Contact Form

Simple form on `/connect`:
- **Fields:** Name, Email, Type (Speaking / Podcast / Consulting / Other), Message
- **Implementation:** Vercel serverless function → sends email to Jeff (or use Formspree/Formspark free tier to avoid building email infra)
- **No database needed** for form submissions

---

## QR Code

- Points to: `https://udlforlittlelearners.com/resources`
- Generate at high resolution (SVG + PNG) for print
- Style: could incorporate book cover colors or be simple black/white for publisher requirements
- Deliver to Jeff as files he can send to publisher

---

## Future Considerations (not in initial build)

- **Course integration:** "Coming Soon" placeholder on Book page. When ready, could link to Teachable/Thinkific or build a simple course page.
- **Interactive forms:** Reflection questions as fillable web forms (deferred — launching with view + download)
- **Newsletter signup:** Not included per user request. Easy to add later with ConvertKit/Mailchimp embed.
- **Analytics:** Consider adding lightweight analytics (Vercel Analytics free tier or Plausible)

---

## Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Domain | udlforlittlelearners.com | Jeff's choice, matches book title exactly |
| Resource org | Chapter view + type filter | Readers coming from book need chapter nav; browsing teachers need type filter |
| Interactivity | View on page + PDF download | Simple, reliable. Interactive forms deferred. |
| Visual style | Match book cover | Target audience is early childhood educators; playful warmth builds trust |
| CMS | MDX files in repo | Free, no dependencies, Jeff can edit markdown. Falls within his technical comfort with guidance. |
| Author photo | Background removed, AHD about-page style | User preference |
| Video | Embed support built, Drive links for now | Permissions pending for classroom tour video |
| Testimonials | Integrated on Home page | Keeps site lean, visitors see them immediately |
| Contact form | Formspree or similar | Avoids building email infrastructure |
