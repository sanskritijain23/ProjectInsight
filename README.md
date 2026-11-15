# ProjectInsight — Frontend Architecture & Demonstration Guide

> **AI-Powered College Project Intelligence Platform**  
> *"Discover Existing Work. Inspire New Ideas."*  
> Editorial academic intelligence interface built with React, Vite, Tailwind CSS, and Recharts.

---

## 1. Visual & Design Identity

The entire application implements a **Burgundy + Beige + Warm Ivory** visual identity with editorial typography:

| Token | Hex Code | Purpose |
|---|---|---|
| Primary Burgundy | `#6D263D` | Primary actions, branding, active navigation, key headings |
| Dark Wine | `#4B192B` | Split-screen login hero, deep accents |
| Secondary Burgundy | `#8A4053` | Secondary indicators, badges, hover accents |
| Warm Ivory Background | `#F7F3EB` | Main application background |
| Card Background | `#FFFCF7` | Elevated academic cards, panels, modals |
| Beige | `#E9DFD0` | Borders, subtle dividers, pill backdrops |
| Muted Rose | `#D8B9B5` | Soft accents, subtle highlight tags |
| Antique Accent | `#B58C72` | Eyebrow tags, category labels, academic flourishes |
| Primary Text | `#302B29` | High-contrast readable typography |
| Secondary Text | `#82766F` | Metadata, abstracts, helper labels |
| Borders | `#E8DED2` | Refined card borders |

### Typography
- **Headings & Editorial Display**: *Cormorant Garamond* (Google Fonts)
- **Body, Navigation, Data & Controls**: *DM Sans* (Google Fonts)

---

## 2. Core Modules & Routing

### Public Routes
- `/`: Editorial Academic Landing Page with hero, live preview, 3-phase methodology, capabilities, and collegiate integrity policy.
- `/login`: Split-screen authentication with Student / Faculty role switcher and instant 1-click demo credential filling.

### Student Panel (`/student`)
- `/student/dashboard`: Welcome banner, key stats, recent analysis cards, domain explorer, and recently indexed projects.
- `/student/projects`: Searchable project archive with multi-faceted domain & tech filters, sorting, grid/list view toggle, and bookmarks.
- `/student/projects/:id`: Comprehensive project reading dossier with abstract, features, limitations, GitHub link, and lineage predecessors.
- `/student/analyse`: Central semantic analysis engine with 1-click demo presets, dynamic feature/tech tagging, and 4-stage animated loading simulation.
- `/student/analysis/:id`: Visual highlight report with similarity gauge, top 5 matching archive records, side-by-side feature differential, documented limitation gaps, and PDF report export.
- `/student/analyses`: Searchable submission history of all analysed propositions.
- `/student/saved`: Bookmarked literature review collection.
- `/student/settings`: Student profile and capstone review alerts.

### Faculty & Coordinator Panel (`/faculty`)
- `/faculty/dashboard`: Academic supervision overview with Recharts donut chart, technology bar chart, yearly submission trendline, and pending review queue.
- `/faculty/projects`: Full admin repository management with search, filter, edit, and permanent delete with modal confirmation.
- `/faculty/projects/new`: Dynamic project creation interface with expandable feature, limitation, and tech tags.
- `/faculty/projects/edit/:id`: Edit and update existing archive records.
- `/faculty/reviews`: Capstone idea review queue where faculty evaluate student submissions, leave feedback notes, and update status.
- `/faculty/analytics`: In-depth curriculum analytics, including repeated project theme saturation warnings and redirection guidelines.
- `/faculty/settings`: Faculty coordinator preferences and similarity threshold controls.

---

## 3. Dedicated Service Layer (`src/services/`)

All UI components are decoupled from business logic and state persistence:

- `authService.js`: Authentication state, role switching, mock JWT isolation.
- `projectService.js`: Project querying, full-text searching, multi-filter evaluation, bookmarks, and CRUD operations.
- `analysisService.js`: Multi-stage semantic simulation, vector token scoring, feature differential extraction, and limitation gap synthesis.
- `analyticsService.js`: Statistical computations, domain distribution, tech trends, and faculty review queue management.

Data is seeded into browser `localStorage`, ensuring all changes (new projects, analyses, edits, bookmarks, reviews) persist across user interactions.

---

## 4. How to Run

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Start Vite development server
npm run dev
# -> Runs on http://localhost:3000

# 3. Build for production
npm run build
```
