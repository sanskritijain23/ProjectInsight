# ProjectInsight — Backend Handoff & API Specification Document

> **Platform Overview:**  
> **ProjectInsight** is a university-level capstone project intelligence and prior-art discovery platform ("Discover Existing Work. Inspire New Ideas."). It indexes multi-year engineering capstone archives to map conceptual lineage, extract documented technical limitations, evaluate student proposal feasibility, and alert faculty review committees to saturated project themes.
>
> This document provides the backend engineering team with a complete specification to build and integrate the production backend (FastAPI + PostgreSQL + pgvector / SentenceTransformers) with the existing React frontend.

---

## Table of Contents
1. [Project Directory Structure & Key Files](#1-project-directory-structure--key-files)
2. [Frontend Technology Stack & Dependencies](#2-frontend-technology-stack--dependencies)
3. [Existing Pages, Routes & Component Inventory](#3-existing-pages-routes--component-inventory)
4. [User Interactions, Forms, Filters & Event Handlers](#4-user-interactions-forms-filters--event-handlers)
5. [Current Mock Data Audit](#5-current-mock-data-audit)
6. [Data Requiring Database Persistence](#6-data-requiring-database-persistence)
7. [Required API Endpoints & JSON Payloads](#7-required-api-endpoints--json-payloads)
8. [Database Schema & Entity-Relationship Architecture](#8-database-schema--entity-relationship-architecture)
9. [Authentication, Authorization & Role-Based Access Control (RBAC)](#9-authentication-authorization--role-based-access-control-rbac)
10. [AI & Semantic Analysis Engine Requirements](#10-ai--semantic-analysis-engine-requirements)
11. [Environment Configuration](#11-environment-configuration)
12. [Frontend Setup & Installation Guide](#12-frontend-setup--installation-guide)
13. [Service-by-Service API Migration Guide](#13-service-by-service-api-migration-guide)

---

## 1. Project Directory Structure & Key Files

The project repository is partitioned into `frontend/` (React application) and `backend/` (FastAPI scaffold):

```text
ProjectDNA/
├── BACKEND_HANDOFF.md                  # This specification document
├── backend/                            # FastAPI backend scaffold
│   └── app/
│       ├── models/                     # SQLAlchemy / SQLModel database models
│       ├── routers/                    # FastAPI route handlers
│       ├── schemas/                    # Pydantic validation schemas
│       └── services/                   # Business logic & vector search services
└── frontend/                           # React + Vite application
    ├── index.html                      # HTML root with Cormorant Garamond & DM Sans fonts
    ├── package.json                    # Frontend dependencies & npm scripts
    ├── postcss.config.js               # PostCSS configuration
    ├── tailwind.config.js              # Custom theme (Burgundy, Beige, Warm Ivory palette)
    ├── vite.config.js                  # Vite configuration (Port 3000, host: true)
    └── src/
        ├── App.jsx                     # Root component with Providers & BrowserRouter
        ├── index.css                   # Tailwind base directives & custom focus rings
        ├── main.jsx                    # React DOM entry point
        ├── components/
        │   ├── analysis/
        │   │   ├── AnalysisCard.jsx    # Card displaying submitted idea summary & score
        │   │   ├── ComparisonPanel.jsx # Side-by-side feature differential panel
        │   │   └── FeatureList.jsx     # Dynamic add/remove list for features & limitations
        │   ├── charts/
        │   │   └── ChartCard.jsx       # Reusable wrapper for Recharts visualizations
        │   ├── common/
        │   │   ├── DomainBadge.jsx     # Visual badge for academic domains (AI, IoT, etc.)
        │   │   ├── EmptyState.jsx      # Empty state placeholder with action button
        │   │   ├── FilterDropdown.jsx  # Reusable styled select dropdown
        │   │   ├── LoadingState.jsx    # Loading spinner & multi-stage progress indicator
        │   │   ├── Modal.jsx           # Accessible dialog for confirmations & reviews
        │   │   ├── SearchBar.jsx       # Input with debounce, search icon & clear button
        │   │   ├── SimilarityScore.jsx # Semantic overlap gauge & badge
        │   │   ├── StatCard.jsx        # Metric summary card with icon & subtitle
        │   │   └── TechnologyTag.jsx   # Monospace tech tag with optional remove button
        │   ├── layout/
        │   │   ├── AppLayout.jsx       # Shared dashboard shell with responsive sidebar drawer
        │   │   ├── Footer.jsx          # Public editorial footer
        │   │   ├── Header.jsx          # Top header with dynamic page titles & mode pill
        │   │   ├── Navbar.jsx          # Public landing page navigation
        │   │   └── Sidebar.jsx         # Collapsible navigation with Student/Faculty switcher
        │   └── projects/
        │       ├── ProjectCard.jsx     # Editorial card for repository deliverables
        │       └── ProjectTable.jsx    # Tabular list view for projects & faculty management
        ├── context/
        │   ├── AuthContext.jsx         # User session, login, logout & role-switch state
        │   └── ToastContext.jsx        # Floating notifications (success, error, info)
        ├── data/                       # Initial seed datasets (currently in localStorage)
        │   ├── mockAnalyses.js         # 3 realistic feasibility analyses
        │   ├── mockAnalytics.js        # Historical distributions & saturated themes
        │   ├── mockProjects.js         # 10 realistic capstone projects
        │   └── mockReviews.js          # 5 faculty review queue records
        ├── pages/
        │   ├── faculty/
        │   │   ├── AddEditProject.jsx  # Form to create or update archive deliverables
        │   │   ├── AnalysisReviews.jsx # Review queue for faculty evaluations & guidance
        │   │   ├── FacultyAnalytics.jsx# Saturation metrics, trends & distribution charts
        │   │   ├── FacultyDashboard.jsx# Oversight summary, metrics & recent activity
        │   │   ├── FacultySettings.jsx # Coordinator threshold sliders & alert policies
        │   │   └── ManageProjects.jsx  # Admin project table with search, filter & delete
        │   ├── public/
        │   │   ├── LandingPage.jsx     # Editorial public showcase with interactive preview
        │   │   └── LoginPage.jsx       # Split-screen login with 1-click demo accounts
        │   └── student/
        │       ├── AnalysisResult.jsx  # Highlight report: overlap score, top matches, gaps
        │       ├── MyAnalyses.jsx      # Searchable history of submitted proposals
        │       ├── NewIdeaAnalysis.jsx # Feasibility form with dynamic tags & 4-stage loader
        │       ├── ProjectDetails.jsx  # Comprehensive project dossier with citations
        │       ├── ProjectRepository.jsx# Searchable archive with multi-filters & view toggle
        │       ├── SavedProjects.jsx   # Bookmarked literature review collection
        │       ├── StudentDashboard.jsx# Student workspace with metrics, activity & feeds
        │       └── StudentSettings.jsx # Candidate profile & review notification toggles
        ├── routes/
        │   └── AppRoutes.jsx           # React Router route definitions
        └── services/                   # Service layer abstraction (REPLACE WITH REAL APIS)
            ├── activityService.js      # Student & Faculty activity logging
            ├── analysisService.js      # Simulated vector analysis & scoring
            ├── analyticsService.js     # Faculty metrics, reviews & charts data
            ├── authService.js          # Authentication & role-switch state
            └── projectService.js       # Projects CRUD, search, filter & bookmarks
```

---

## 2. Frontend Technology Stack & Dependencies

The frontend is strictly built with the following technologies (no UI kits or template packages):

| Package / Technology | Version | Purpose in Application |
|---|---|---|
| **React** | `^18.3.1` | Core UI library (functional components & hooks) |
| **Vite** | `^5.4.11` | Build tool and high-performance development server |
| **Tailwind CSS** | `^3.4.16` | Utility-first CSS styling with custom theme variables |
| **React Router DOM** | `^6.28.0` | Client-side routing, query parameter management & layout routing |
| **Recharts** | `^2.13.3` | Donut charts, Bar charts, and Line charts for faculty analytics |
| **Lucide React** | `^0.468.0` | Clean, academic icons (no emojis used in interface) |
| **Google Fonts** | CDN | *Cormorant Garamond* (headings) & *DM Sans* (body/controls) |

---

## 3. Existing Pages, Routes & Component Inventory

| Route Path | Page Component | Access Role | Description & Primary View |
|---|---|---|---|
| `/` | `LandingPage.jsx` | Public | Editorial landing page with hero, live preview, 3-phase methodology, and platform capabilities. |
| `/login` | `LoginPage.jsx` | Public | Split-screen authentication with Student/Faculty tabs and 1-click demo credential filling. |
| `/student/dashboard` | `StudentDashboard.jsx` | Student | Candidate workspace with live project stats, recent feasibility pre-checks, recent activity feed, and domain navigation. |
| `/student/projects` | `ProjectRepository.jsx` | Student / All | Searchable capstone archive with domain/technology filters, sort dropdown, and Grid/List switcher. |
| `/student/projects/:id` | `ProjectDetails.jsx` | Student / All | Detailed project reading dossier with abstract, features, limitations, GitHub link, and lineage predecessors. |
| `/student/analyse` | `NewIdeaAnalysis.jsx` | Student | Feasibility check form with dynamic feature/tech tags, sample presets, and 4-stage loading simulation. |
| `/student/analysis/:id` | `AnalysisResult.jsx` | Student | Intelligence report displaying overlap score, top 5 matches, feature differential panel, research gaps, and PDF export. |
| `/student/analyses` | `MyAnalyses.jsx` | Student | Searchable portfolio of all submitted project propositions and their evaluation statuses. |
| `/student/saved` | `SavedProjects.jsx` | Student | Collection of bookmarked projects curated for proposal literature review. |
| `/student/settings` | `StudentSettings.jsx` | Student | Candidate profile (Name, Roll No., Department, Semester) and notification preferences. |
| `/faculty/dashboard` | `FacultyDashboard.jsx` | Faculty | Oversight dashboard with Recharts donut/bar/line visualizations, review queue counter, and recent activity. |
| `/faculty/projects` | `ManageProjects.jsx` | Faculty | Admin repository table with search, domain filtering, edit action, and deletion with confirmation modal. |
| `/faculty/projects/new` | `AddEditProject.jsx` | Faculty | Form to index a new capstone deliverable with dynamic features, limitations, and tech tags. |
| `/faculty/projects/edit/:id` | `AddEditProject.jsx` | Faculty | Edit form to update metadata, demonstrated features, and acknowledged limitations of an existing record. |
| `/faculty/reviews` | `AnalysisReviews.jsx` | Faculty | Evaluation queue with *All*, *Pending Review*, and *Reviewed* filter tabs and guidance modal. |
| `/faculty/analytics` | `FacultyAnalytics.jsx` | Faculty | Longitudinal charts, tech stack penetration, and **Saturated Project Themes** table with committee policies. |
| `/faculty/settings` | `FacultySettings.jsx` | Faculty | Coordinator profile, similarity threshold sliders (50%–90%), and duplicate alert toggles. |

---

## 4. User Interactions, Forms, Filters & Event Handlers

The backend developer must ensure API endpoints support all of the following user actions:

### 4.1 Authentication & Session Management
- **Role Selection:** User clicks "Student Mode" or "Faculty Mode" tab on `/login`.
- **Form Submission:** Submits `email` and `password`. Validates credentials and redirects based on role.
- **Sidebar Role Switcher:** In-app pill allows instant switching between Student and Faculty modes.
- **Sign Out:** Clears session and redirects to `/login`.

### 4.2 Project Repository Searching & Filtering (`/student/projects` & `/faculty/projects`)
- **Search Query Input:** Real-time text search across title, abstract, domain, and technologies with clear button `(×)`.
- **Domain Filter Dropdown:** Filters by domain (`All`, `Artificial Intelligence`, `Healthcare`, `Cybersecurity`, `IoT`, `Web Development`, `Education`).
- **Technology Filter Dropdown:** Filters by specific technology (`Python`, `PyTorch`, `React`, `Docker`, etc.).
- **Sort Dropdown:** Sorts results by `newest`, `citations`, `title` (A–Z), and `year` (Academic Year).
- **Reset Filters Button:** Appears whenever search or filters are active; resets to default view.
- **View Toggle:** Switches between Responsive Grid Cards (`ProjectCard.jsx`) and Structured Table Rows (`ProjectTable.jsx`).
- **Bookmark Toggle:** Bookmark icon on project cards and details pages adds/removes project from user's saved list.

### 4.3 Proposal Feasibility Form (`/student/analyse`)
- **Preset Quick-Fill Buttons:** Clicking "+ Vision & Speech Capstone" or "+ Zero-Knowledge Security" populates the entire form with sample data for demonstration.
- **Dynamic Proposed Features List:**
  - Typing in input and pressing `Enter` or clicking `Add` appends a feature item.
  - Clicking `×` removes an individual feature item.
  - Validation requires at least 1 feature item before submission.
- **Dynamic Technology Tags:**
  - Typing technology name and pressing `Enter` or clicking `Add` appends a tag.
  - Clicking `×` removes an individual tag.
- **Form Submission:**
  - Triggers a 4-stage animated progress sequence:
    1. *Analyzing project description & problem statement formulation...*
    2. *Cross-referencing repository archives & domain literature...*
    3. *Evaluating conceptual overlap & extracting limitation gaps...*
    4. *Synthesizing prior art findings & novelty recommendations...*
  - On completion, creates a persistent analysis record and redirects to `/student/analysis/:id`.

### 4.4 Analysis Result Actions (`/student/analysis/:id`)
- **Export Dossier (PDF):** Triggers `window.print()` with custom print styling (hiding navigation and action buttons).
- **Analyse Another Proposal:** Navigates back to clean `/student/analyse` form.
- **Predecessor Navigation:** "View Project Details" button on any of the top 5 matches opens that project's dossier.

### 4.5 Faculty Project Management (`/faculty/projects` & `/faculty/projects/new`)
- **Add New Project Form:** Validates title and abstract, accepts dynamic feature items, dynamic limitation items, and dynamic technology tags. Submits payload to storage.
- **Edit Project Form:** Pre-populates all existing project fields by `:id` and updates record on submit.
- **Delete Project Modal:** Clicking delete icon opens confirmation modal displaying project title; confirming permanently deletes record.

### 4.6 Faculty Review & Evaluation (`/faculty/reviews`)
- **Queue Tab Filters:** Toggles between `All Submissions`, `Pending Review`, and `Reviewed`.
- **Open Dossier:** Opens student's full analysis report in view-only mode.
- **Evaluate & Guide Modal:**
  - Selects decision: *Approved for Implementation*, *Request Technical Clarification*, *Needs Methodology Review*, or *Reject Duplicate Proposition*.
  - Enters faculty guidance notes in textarea.
  - Submits update: updates status, reviewer timestamp, and logs activity in both faculty and student feeds.

---

## 5. Current Mock Data Audit

The frontend currently uses static mock data initialized into browser `localStorage`. The backend developer must replace these datasets with database queries:

| Mock File | Current Mock Entities | Replacement Backend Database Table |
|---|---|---|
| `src/data/mockProjects.js` | 10 comprehensive academic projects with abstracts, features, limitations, GitHub links, authors, and citations. | `projects` table (with vector embeddings) |
| `src/data/mockAnalyses.js` | 3 complete feasibility analysis reports with similarity scores, top 5 matches, feature differentials, and limitation gaps. | `analyses` table |
| `src/data/mockReviews.js` | 5 student proposal reviews with student details, similarity scores, status, and faculty notes. | `reviews` table (joined with `users` and `analyses`) |
| `src/data/mockAnalytics.js` | Domain distributions, technology adoption counts, yearly submission totals, and 5 saturated project themes. | Aggregation queries over `projects` and `analyses` |
| `src/services/activityService.js` | 7 static student and faculty recent activity events. | `activity_logs` table |
| `src/services/authService.js` | 2 demo accounts: `student@college.edu` and `faculty@college.edu`. | `users` table with bcrypt password hashes |

---

## 6. Data Requiring Database Persistence

When migrating from `localStorage` to PostgreSQL, the following state must be persisted:

1. **User Accounts & Roles:** Student candidate roll numbers, faculty designations, department affiliations, password hashes.
2. **Project Repository Archive:** Title, abstract, detailed technical description, domain, academic year, authors, faculty advisor, GitHub URL, citations count, demonstrated features array, documented limitations array, technologies array, and 384-dimensional vector embedding.
3. **User Bookmarks:** Association table mapping `user_id` to bookmarked `project_id`.
4. **Feasibility Analyses:** Submitted proposal title, domain, description, proposed features, proposed technologies, calculated similarity score, matched project IDs, feature comparison JSON, extracted gaps JSON, and submission timestamp.
5. **Committee Reviews:** Proposal review status (`Pending Review`, `Reviewed`), committee decision, faculty feedback notes, reviewer user ID, review timestamp.
6. **Activity Log:** Audit trail of student submissions, bookmarks, faculty evaluations, and domain saturation alerts.

---

## 7. Required API Endpoints & JSON Payloads

All endpoints should follow RESTful conventions under the prefix `/api/v1`.

### 7.1 Authentication Endpoints

#### `POST /api/v1/auth/login`
Authenticates user and returns JWT access token with role claims.

- **Request:**
```json
{
  "email": "student@college.edu",
  "password": "studentpassword123",
  "role": "student"
}
```

- **Response (`200 OK`):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "usr-stu-01",
    "name": "Nitya Arya",
    "email": "nitya.arya@college.edu",
    "role": "student",
    "roll_number": "21BCE1001",
    "department": "Computer Science & Engineering",
    "institution": "Maulana Azad National Institute of Technology, Bhopal",
    "semester": "Semester VII (Capstone)"
  }
}
```

> **Demo Seed Student Accounts:**
> 1. `nitya.arya@college.edu` / `Nitya@Demo101` (Nitya Arya, 21BCE1001)
> 2. `sanskriti.jain@college.edu` / `Sanskriti@Demo102` (Sanskriti Jain, 21BCE1002)
> 3. `aradhya.jain@college.edu` / `Aradhya@Demo103` (Aradhya Jain, 21BCE1003)
> 4. `hemant.dangi@college.edu` / `Hemant@Demo104` (Hemant Dangi, 21BCE1004)

#### `GET /api/v1/auth/me`
Returns profile of currently authenticated user from Bearer token.

---

### 7.2 Project Repository Endpoints

#### `GET /api/v1/projects`
Search and filter projects in the repository archive.

- **Query Parameters:**
  - `search` (optional string): Full-text search term.
  - `domain` (optional string): Filter by domain (e.g. `Healthcare`, `All`).
  - `technology` (optional string): Filter by technology tag (e.g. `PyTorch`, `All`).
  - `sort` (optional string): `newest` | `citations` | `title` | `year`.
  - `page` (optional int, default `1`): Pagination page.
  - `limit` (optional int, default `20`): Page size.

- **Response (`200 OK`):**
```json
{
  "total": 10,
  "page": 1,
  "limit": 20,
  "items": [
    {
      "id": "proj-001",
      "title": "NeuroScan: Automated Brain MRI Tumor Segmentation & Grading",
      "abstract": "A dual-branch 3D U-Net pipeline integrating spatial attention mechanisms for precise volumetric segmentation of glioblastoma multiforme sub-regions...",
      "domain": "Healthcare",
      "academic_year": "2023-2024",
      "author": "Rohan Varma, Sneha Mukherjee",
      "advisor": "Dr. K. S. Venkatesh",
      "technologies": ["PyTorch", "MONAI", "FastAPI", "Docker", "React", "SimpleITK"],
      "citations": 14,
      "status": "Verified",
      "is_bookmarked": true,
      "submission_date": "2024-03-18"
    }
  ]
}
```

#### `GET /api/v1/projects/{id}`
Returns full project details including features, limitations, GitHub link, and calculated related projects.

- **Response (`200 OK`):**
```json
{
  "id": "proj-001",
  "title": "NeuroScan: Automated Brain MRI Tumor Segmentation & Grading",
  "abstract": "A dual-branch 3D U-Net pipeline integrating spatial attention mechanisms...",
  "description": "NeuroScan tackles the diagnostic bottlenecks in clinical neuro-oncology by automating high-accuracy volumetric segmentation...",
  "domain": "Healthcare",
  "academic_year": "2023-2024",
  "author": "Rohan Varma, Sneha Mukherjee",
  "advisor": "Dr. K. S. Venkatesh",
  "technologies": ["PyTorch", "MONAI", "FastAPI", "Docker", "React", "SimpleITK"],
  "features": [
    "Multi-parametric 3D MRI co-registration and skull stripping",
    "Sub-region segmentation (enhancing tumor, peritumoral edema, necrotic core)",
    "Interactive 3D orthogonal slice viewer with contour overlays"
  ],
  "limitations": [
    "High inference latency on standard consumer-grade GPUs without tensor quantization",
    "Limited generalizability to low-field MRI scanners (sub-1.5T systems)"
  ],
  "github_url": "https://github.com/projectdna-archive/neuroscan-mri",
  "citations": 14,
  "status": "Verified",
  "is_bookmarked": true,
  "submission_date": "2024-03-18",
  "related_projects": [
    {
      "id": "proj-009",
      "title": "Synthetix: High-Throughput Synthetic Patient EHR Generator",
      "domain": "Healthcare",
      "academic_year": "2023-2024",
      "technologies": ["Python", "PyTorch", "Diffusers"]
    }
  ]
}
```

#### `POST /api/v1/projects` *(Faculty Only)*
Creates a new project record and generates vector embeddings.

- **Request:**
```json
{
  "title": "EdgeGuard: Decentralized Intrusion Detection on Micro-Routers",
  "abstract": "An intrusion detection agent compiling decision forests to eBPF bytecode...",
  "description": "Comprehensive explanation of network telemetry and eBPF filters...",
  "domain": "Cybersecurity",
  "academic_year": "2024-2025",
  "author": "Karan Singhal, Ritu Sen",
  "advisor": "Dr. Sandeep K. Shukla",
  "technologies": ["C", "eBPF", "Go", "React", "Linux"],
  "features": ["Kernel-level packet filtering", "Sub-microsecond packet latency"],
  "limitations": ["Requires Linux kernel version 5.15 or newer"],
  "github_url": "https://github.com/projectdna-archive/edgeguard-ebpf"
}
```

#### `PUT /api/v1/projects/{id}` *(Faculty Only)*
Updates existing project record metadata, features, and limitations.

#### `DELETE /api/v1/projects/{id}` *(Faculty Only)*
Permanently deletes project record from repository archive and vector index.

---

### 7.3 Bookmarks Endpoints

#### `GET /api/v1/bookmarks`
Returns all projects bookmarked by the currently authenticated student.

#### `POST /api/v1/bookmarks/{project_id}/toggle`
Toggles bookmark state for the authenticated user.

- **Response (`200 OK`):**
```json
{
  "project_id": "proj-001",
  "is_bookmarked": true
}
```

---

### 7.4 Feasibility & Prior Art Analysis Endpoints

#### `POST /api/v1/analyses`
Core semantic analysis endpoint. Ingests student proposal, queries vector embeddings against archived deliverables, calculates semantic overlap, extracts feature differentials, and identifies research gaps.

- **Request:**
```json
{
  "title": "OmniScribe: Edge Vision-Language Assistant for Real-Time Handwritten Equation Solving",
  "domain": "Artificial Intelligence",
  "description": "A compact on-device vision-language model deployed on mobile hardware to parse complex multi-step handwritten algebra equations...",
  "features": [
    "Real-time camera feed stroke recognition and continuous noise cancellation",
    "Vernacular audio narration explaining why each algebraic transformation occurred",
    "Offline inference quantized for low-tier Android smartphones (<2GB RAM)"
  ],
  "technologies": ["PyTorch", "ONNX Runtime", "Flutter", "FastAPI", "SymPy"]
}
```

- **Response (`201 Created`):**
```json
{
  "id": "ana-101",
  "title": "OmniScribe: Edge Vision-Language Assistant for Real-Time Handwritten Equation Solving",
  "domain": "Artificial Intelligence",
  "date": "2024-11-12",
  "status": "Completed",
  "highest_similarity": 72,
  "summary": "Analysis identifies 72% highest conceptual alignment with ScribeSense (2024). Substantive novelty opportunities identified in mobile quantization and audio tutoring.",
  "top_matches": [
    {
      "project_id": "proj-004",
      "project_title": "ScribeSense: Multimodal Vernacular Handwritten Math OCR & Solver",
      "similarity": 72,
      "domain": "Artificial Intelligence",
      "technologies": ["Python", "Hugging Face", "PyTorch", "LaTeX"],
      "matching_concepts": [
        "Handwritten mathematical formula parsing",
        "Vision encoder-decoder with LaTeX translation",
        "Symbolic algebra engine integration"
      ],
      "differentiating_factors": [
        "OmniScribe proposes on-device INT4 quantization for mobile devices",
        "ScribeSense was purely server-side FastAPI with web frontend"
      ]
    }
  ],
  "comparison": {
    "common_features": [
      {
        "name": "Bilingual Indic-Latin mathematical parsing",
        "context": "Both projects incorporate OCR pipelines converting regional written characters into LaTeX syntax."
      }
    ],
    "newly_proposed_features": [
      {
        "name": "On-device INT4 quantization for sub-2GB RAM smartphones",
        "impact": "High Technical Novelty",
        "rationale": "Archived projects suffered from server latency bottlenecks; client-side execution removes cloud GPU cost barriers."
      }
    ]
  },
  "opportunities": {
    "documented_limitations_in_archive": [
      "ScribeSense documented severe latency (~4.2s per equation) when dispatching camera images to remote cloud instances.",
      "Existing systems failed when camera angle perspective was skewed greater than 25 degrees."
    ],
    "unaddressed_feature_gaps": [
      "Zero prior projects provided interactive step-level counter-examples when student made factoring errors.",
      "No existing college repository entry incorporates offline voice tutoring dialogue."
    ],
    "recommended_directions": [
      "Incorporate a homography rectification module before feeding image slices into the vision encoder.",
      "Benchmark inference execution on MediaTek Helio and Snapdragon 600-series mobile processors."
    ]
  }
}
```

#### `GET /api/v1/analyses`
Returns all analyses submitted by the authenticated student.

#### `GET /api/v1/analyses/{id}`
Returns complete analysis report by ID.

---

### 7.5 Faculty Proposal Review Endpoints

#### `GET /api/v1/reviews` *(Faculty Only)*
Returns student submissions in the evaluation queue with optional filter (`all`, `pending`, `reviewed`).

- **Response (`200 OK`):**
```json
[
  {
    "id": "rev-201",
    "student_name": "Aarav Sharma",
    "student_email": "aarav.sharma@college.edu",
    "student_roll": "21BCE1042",
    "project_idea": "OmniScribe: Edge Vision-Language Assistant for Real-Time Handwritten Equation Solving",
    "domain": "Artificial Intelligence",
    "submission_date": "2024-11-10",
    "similarity_score": 72,
    "status": "Pending Review",
    "analysis_id": "ana-101",
    "faculty_notes": "Shows strong conceptual promise. Need student to specify how INT4 quantization will preserve accuracy.",
    "reviewer_name": "Dr. K. S. Venkatesh",
    "recommended_action": "Request Technical Clarification"
  }
]
```

#### `PUT /api/v1/reviews/{id}` *(Faculty Only)*
Updates evaluation decision, guidance notes, and review status.

- **Request:**
```json
{
  "status": "Reviewed",
  "recommended_action": "Approved for Implementation",
  "faculty_notes": "Approved for Phase 1 prototype. Recommended student to deploy on Polygon zkEVM testnet to keep gas costs near zero."
}
```

---

### 7.6 Analytics & Oversight Endpoints

#### `GET /api/v1/analytics/overview` *(Faculty Only)*
Returns aggregated statistics for faculty dashboard charts:
- `domain_distribution`: Count and percentage per domain.
- `technology_trends`: Most adopted technologies across all archived deliverables.
- `yearly_submissions`: Total submissions and approval rates per academic year.
- `repeated_themes`: Saturated project themes with historical attempt counts and committee redirection policies.
- `similarity_distribution`: Breakdown of evaluated student proposals by overlap band.

---

### 7.7 Recent Activity Endpoints

#### `GET /api/v1/activities/student`
Returns recent student events (feasibility checks, bookmarks, faculty guidance decisions).

#### `GET /api/v1/activities/faculty`
Returns committee events (proposals submitted, reviews completed, saturation alerts).

---

## 8. Database Schema & Entity-Relationship Architecture

The recommended database is **PostgreSQL 15+** with the **`pgvector`** extension enabled.

```mermaid
erDiagram
    USERS ||--o{ BOOKMARKS : creates
    USERS ||--o{ ANALYSES : submits
    USERS ||--o{ REVIEWS : evaluates
    USERS ||--o{ ACTIVITY_LOGS : triggers
    PROJECTS ||--o{ BOOKMARKS : "bookmarked in"
    ANALYSES ||--o| REVIEWS : "evaluated in"

    USERS {
        uuid id PK
        varchar email UK
        varchar hashed_password
        varchar role "student | faculty"
        varchar name
        varchar roll_number "nullable for faculty"
        varchar department
        varchar institution
        varchar semester "nullable for faculty"
        varchar designation "nullable for student"
        timestamp created_at
    }

    PROJECTS {
        uuid id PK
        varchar title
        text abstract
        text description
        varchar domain
        varchar academic_year
        varchar author
        varchar advisor
        varchar github_url
        integer citations
        varchar status "Verified | Under Review | Archived"
        jsonb features "array of string features"
        jsonb limitations "array of string limitations"
        jsonb technologies "array of string tech tags"
        vector embedding_vector "384-dim vector for prior art search"
        date submission_date
        timestamp created_at
        timestamp updated_at
    }

    BOOKMARKS {
        uuid user_id FK
        uuid project_id FK
        timestamp created_at
    }

    ANALYSES {
        uuid id PK
        uuid user_id FK
        varchar title
        varchar domain
        text description
        jsonb features
        jsonb technologies
        integer highest_similarity
        varchar status "Completed | In Review"
        jsonb top_matches "top 5 matching projects & scores"
        jsonb comparison "common vs newly proposed features"
        jsonb opportunities "limitations, gaps, recommendations"
        vector embedding_vector "query vector"
        date date
        timestamp created_at
    }

    REVIEWS {
        uuid id PK
        uuid analysis_id FK
        uuid student_id FK
        uuid reviewer_id FK
        varchar status "Pending Review | Reviewed"
        varchar recommended_action
        text faculty_notes
        date submission_date
        timestamp reviewed_at
    }

    ACTIVITY_LOGS {
        uuid id PK
        uuid user_id FK
        varchar role "student | faculty | all"
        varchar type "analysis | bookmark | evaluation | saturation"
        varchar title
        text description
        varchar target_link
        timestamp created_at
    }
```

---

## 9. Authentication, Authorization & Role-Based Access Control (RBAC)

The backend must enforce strict Role-Based Access Control using JWT bearer tokens:

```text
Authorization: Bearer <JWT_TOKEN>
```

### Role Permissions Matrix

| Endpoint Group | Action | Student Role | Faculty Role |
|---|---|---|---|
| `/auth/*` | Login, check session | Allowed | Allowed |
| `/projects` | Read repository archive, search & filter | Allowed | Allowed |
| `/projects/{id}` | Read full project details & lineage | Allowed | Allowed |
| `/projects` | Create new capstone deliverable | **Forbidden (403)** | **Allowed** |
| `/projects/{id}` | Update / Edit capstone deliverable | **Forbidden (403)** | **Allowed** |
| `/projects/{id}` | Delete project from archive | **Forbidden (403)** | **Allowed** |
| `/bookmarks/*` | View and toggle saved projects | Allowed (own bookmarks) | Allowed (own bookmarks) |
| `/analyses` | Run proposal feasibility check | Allowed | Allowed |
| `/analyses/*` | View own submitted analysis reports | Allowed (own only) | Allowed (all proposals) |
| `/reviews` | View evaluation queue | **Forbidden (403)** | **Allowed** |
| `/reviews/{id}` | Update evaluation decision & guidance | **Forbidden (403)** | **Allowed** |
| `/analytics/*` | Access department saturation metrics | **Forbidden (403)** | **Allowed** |
| `/activities/*` | View role-specific activity feed | Allowed (student feed) | Allowed (faculty feed) |

---

## 10. AI & Semantic Analysis Engine Requirements

The core feature of ProjectInsight is the prior art feasibility check (`POST /api/v1/analyses`). In the current frontend, this is simulated in `analysisService.js`.

The backend implementation in FastAPI should implement the following pipeline:

### 10.1 Embedding Generation
- **Model:** SentenceTransformers `all-MiniLM-L6-v2` (384-dimensional dense vectors) or `bge-base-en-v1.5` (768-dimensional).
- **Text Representation:** Combine project fields:
  ```python
  embedding_input = f"{title}. Domain: {domain}. Abstract: {abstract}. Description: {description}. Features: {', '.join(features)}."
  vector = model.encode(embedding_input)
  ```

### 10.2 Cosine Similarity Search
- Query PostgreSQL with `pgvector`:
  ```sql
  SELECT id, title, abstract, domain, technologies, features, limitations,
         1 - (embedding_vector <=> query_vector) AS cosine_similarity
  FROM projects
  WHERE status = 'Verified'
  ORDER BY embedding_vector <=> query_vector
  LIMIT 5;
  ```
- Scale cosine similarity (`0.0` to `1.0`) into percentage (`0%` to `100%`).

### 10.3 Feature Differential & Limitation Synthesis
1. **Common Baseline Features:** Features present in the top-matched project that share semantic overlap with user's proposal.
2. **Newly Proposed Novel Features:** Features declared in the student's proposal that do not appear in the top-matched record.
3. **Documented Archive Limitations:** Query and aggregate the `limitations` array from the top 3 matching projects. These represent concrete research gaps.
4. **Saturation Check:** Check proposal keywords against `repeated_themes` table. If proposal matches a saturated theme (e.g., standard attendance facial recognition), return a saturation warning and committee redirection guidelines.

---

## 11. Environment Configuration

### Frontend Environment Variables (`frontend/.env`)
Create a `.env` file in `frontend/`:

```bash
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Application Environment
VITE_APP_ENV=development
```

### Proposed Backend Environment Variables (`backend/.env`)
The backend developer should configure:

```bash
# Server Configuration
PROJECT_NAME="ProjectDNA Backend"
API_V1_STR="/api/v1"
PORT=8000
HOST="0.0.0.0"

# CORS Configuration (Allow frontend origin)
CORS_ORIGINS=["http://localhost:3000","http://127.0.0.1:3000"]

# Database Configuration (PostgreSQL + pgvector)
POSTGRES_SERVER=localhost
POSTGRES_USER=projectdna_user
POSTGRES_PASSWORD=your_secure_db_password
POSTGRES_DB=projectdna_db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://projectdna_user:your_secure_db_password@localhost:5432/projectdna_db

# JWT Authentication
SECRET_KEY=your_cryptographically_secure_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# AI / Embedding Model
EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
```

---

## 12. Frontend Setup & Installation Guide

To run the frontend on a new developer machine:

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended).
- **npm:** v9.0.0 or higher.

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The application will launch on **`http://localhost:3000/`**.

### Step 3: Verify Production Build
```bash
npm run build
```
This runs Vite production compilation and generates optimized assets in `frontend/dist/`.

---

## 13. Service-by-Service API Migration Guide

The frontend was designed with an isolated service layer (`frontend/src/services/`). UI components **never** call storage directly; they only interact with services.

To connect the backend, replace the functions in `frontend/src/services/` as detailed below.

### 13.1 Create Central API Client (`src/services/apiClient.js`)
Create a unified `fetch` or `axios` client that attaches the JWT token:

```javascript
// frontend/src/services/apiClient.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('projectdna_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP Error ${response.status}`);
  }

  return response.json();
}
```

---

### 13.2 Replace `authService.js`

**Current Implementation:** Uses static users and `localStorage.setItem('projectdna_auth_user')`.

**Backend Replacement:**
```javascript
import { apiRequest } from './apiClient';

export const authService = {
  async login(email, password, role) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    localStorage.setItem('projectdna_token', data.access_token);
    localStorage.setItem('projectdna_auth_user', JSON.stringify(data.user));
    return data.user;
  },

  getCurrentUser() {
    try {
      const stored = localStorage.getItem('projectdna_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async logout() {
    localStorage.removeItem('projectdna_token');
    localStorage.removeItem('projectdna_auth_user');
    return true;
  },

  isAuthenticated() {
    return !!localStorage.getItem('projectdna_token');
  },

  isFaculty() {
    return this.getCurrentUser()?.role === 'faculty';
  },

  isStudent() {
    return this.getCurrentUser()?.role === 'student';
  }
};
```

---

### 13.3 Replace `projectService.js`

**Current Implementation:** Reads and writes to `localStorage` key `'projectdna_projects'`.

**Backend Replacement:**
```javascript
import { apiRequest } from './apiClient';

export const projectService = {
  async getProjects({ search = '', domain = 'All', technology = 'All', sort = 'newest' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (domain !== 'All') params.append('domain', domain);
    if (technology !== 'All') params.append('technology', technology);
    if (sort) params.append('sort', sort);

    const data = await apiRequest(`/projects?${params.toString()}`);
    return data.items || data;
  },

  async getProjectById(id) {
    return apiRequest(`/projects/${id}`);
  },

  async createProject(projectData) {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  async updateProject(id, updatedData) {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
  },

  async deleteProject(id) {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  async toggleBookmark(id) {
    const res = await apiRequest(`/bookmarks/${id}/toggle`, {
      method: 'POST',
    });
    return res.is_bookmarked;
  },

  async getSavedProjects() {
    return apiRequest('/bookmarks');
  },

  async getAvailableDomains() {
    return apiRequest('/projects/metadata/domains');
  },

  async getAvailableTechnologies() {
    return apiRequest('/projects/metadata/technologies');
  }
};
```

---

### 13.4 Replace `analysisService.js`

**Current Implementation:** Simulates vector distance via keyword token overlaps and `setTimeout`.

**Backend Replacement:**
```javascript
import { apiRequest } from './apiClient';

export const analysisService = {
  async getAnalyses(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiRequest(`/analyses${query}`);
  },

  async getAnalysisById(id) {
    return apiRequest(`/analyses/${id}`);
  },

  async runAnalysis(ideaData, onStageChange = () => {}) {
    // Stage 1 & 2 UI visual updates
    onStageChange({ step: 1, label: "Analyzing project description & problem statement..." });
    await new Promise(r => setTimeout(r, 400));

    onStageChange({ step: 2, label: "Cross-referencing repository archives & domain literature..." });

    // Call FastAPI SentenceTransformers vector similarity endpoint
    const result = await apiRequest('/analyses', {
      method: 'POST',
      body: JSON.stringify(ideaData),
    });

    onStageChange({ step: 3, label: "Evaluating conceptual overlap & extracting limitation gaps..." });
    await new Promise(r => setTimeout(r, 300));

    onStageChange({ step: 4, label: "Synthesizing prior art findings & novelty recommendations..." });
    await new Promise(r => setTimeout(r, 300));

    return result;
  }
};
```

---

### 13.5 Replace `analyticsService.js`

**Current Implementation:** Returns static objects from `mockAnalytics.js` and `mockReviews.js`.

**Backend Replacement:**
```javascript
import { apiRequest } from './apiClient';

export const analyticsService = {
  async getFacultyAnalytics() {
    return apiRequest('/analytics/overview');
  },

  async getReviews(filter = 'all') {
    return apiRequest(`/reviews?filter=${filter}`);
  },

  async updateReview(id, { status, facultyNotes, recommendedAction }) {
    return apiRequest(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, facultyNotes, recommendedAction }),
    });
  },

  async getStudentStats() {
    return apiRequest('/analytics/student-stats');
  },

  async getFacultyStats() {
    return apiRequest('/analytics/faculty-stats');
  }
};
```

---

### 13.6 Replace `activityService.js`

**Current Implementation:** Stores activity array in `localStorage`.

**Backend Replacement:**
```javascript
import { apiRequest } from './apiClient';

export const activityService = {
  async getStudentActivities() {
    return apiRequest('/activities/student');
  },

  async getFacultyActivities() {
    return apiRequest('/activities/faculty');
  },

  async logActivity(activity) {
    return apiRequest('/activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }
};
```

---

## 14. Summary & Handoff Checklist for Backend Developer

1. [ ] **Initialize Database:** Setup PostgreSQL instance with `CREATE EXTENSION IF NOT EXISTS vector;`.
2. [ ] **Apply Migrations:** Create tables: `users`, `projects`, `bookmarks`, `analyses`, `reviews`, and `activity_logs`.
3. [ ] **Seed Archive Data:** Ingest initial project deliverables from `frontend/src/data/mockProjects.js` and generate vector embeddings.
4. [ ] **Implement Auth:** Setup `POST /api/v1/auth/login` issuing signed JWT tokens with user roles (`student` vs `faculty`).
5. [ ] **Implement Project CRUD:** Build endpoints for repository search, domain filtering, and faculty editing.
6. [ ] **Implement Vector Inference:** Connect SentenceTransformers (`all-MiniLM-L6-v2`) in `POST /api/v1/analyses` to compute cosine similarity against indexed projects.
7. [ ] **Implement Committee Review Queue:** Setup `GET /api/v1/reviews` and `PUT /api/v1/reviews/{id}`.
8. [ ] **Connect Frontend:** Follow [Section 13](#13-service-by-service-api-migration-guide) to replace `localStorage` calls with `apiClient.js`.
