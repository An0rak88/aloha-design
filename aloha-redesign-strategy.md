# Aloha UI Redesign

## What This Is
A **prototype app** for redesigning Aloha, our farm operations platform. This is not the production app — it's a design tool for exploring and locking down the UI patterns before we build the real thing.

The prototype must:
- Look and feel **polished** — this is what we're presenting and iterating on, not a wireframe
- Support switching between **4 user roles** (Doer, Doer+Recorder, Manager, Executive) — each role sees a different app with different pages, different home screen, different navigation
- Support switching between **web (computer) and mobile (phone)** views for each role — phone renders inside a device frame, uses bottom tab bar instead of sidebar
- Include one **sample screen for each page type** listed below — each screen should use minimal realistic content (not randomly generated fake data)
- Role switcher and device toggle live in a **floating toolbar** at the bottom of the screen

## Principles
- Separate input pages from output pages (exception: inline validation during entry)
- Optimize each page for the role that uses it most
- Phone-first for input, computer-first for output
- Speed over decoration — every tap counts on a phone in the greenhouse
- Full custom UI — Tailwind for styling, no component libraries
- Hard separation between user roles — the app should feel different for each role, not one app with hidden pages

## User Roles

**Doer** — receives tasks, marks complete. Home = my task list.
- Who: laborers, packing line, maintenance crew
- Pages: task list, messages
- Prime device: phone
- Home screen: task list

**Doer + recorder** — receives tasks + enters operational data daily. Home = pinned form shortcuts + task list.
- Who: growers, harvest leads, food safety inspectors, spray techs
- Pages: forms, data tables (reference), task list, grid/matrix
- Prime device: phone + computer
- Home screen: pinnable shortcuts + task list

**Manager** — reviews data, assigns tasks. Home = daily KPI dashboard + task assignment.
- Who: Eric, Bruce, site supervisors
- Pages: dashboards, data tables (review), task list (assign), scheduler
- Prime device: computer
- Home screen: daily KPI dashboard

**Executive** — views analytics. Home = executive dashboard.
- Who: Julian, Lenny
- Pages: dashboards, visualizations, high-level tables
- Prime device: phone + computer
- Home screen: analytical dashboard

## Page Types

### Input
- **Form** — slide-over panel for creating/editing records
- **Data table** — sortable columns, date grouping, summary rows
- **Filtered data table** — data table + sidebar category/status filters
- **Multi-table panel** — side-by-side related tables (Chemistry, Spraying, Palletization)
- **Grid / matrix** — cell-based schedule, columns = greenhouses, rows = dates
- **Scheduler** — weekly employee shift grid + historical sidebar
- **Task list** — action items grouped by status, used by ALL roles

### Output
- **Dashboard — daily KPIs** — summary metrics + time-series charts
- **Dashboard — analytical** — multi-chart grid with sidebar nav
- **Table + chart combo** — raw data alongside trend visualizations
- **Visualization / simulation** — bespoke interactive tools (pond viz, nutrient rebalancing)

### Navigation + Meta
- **Pinnable dashboard (home)** — personal home screen, pin input shortcuts + output widgets
- **Messages** — internal comms, tie to tasks
- **Sidebar nav + command palette** — replaces current 3-tier card grid (Home > Menu > Page)

### Chat
- AI chat interface embedded in the app
- Two modes: questions ("what's the spray protocol for aphids on cukes?") and analytics ("show me drain EC trends for GH 08 last 2 weeks")
- Scoped to the user's data and permissions
- Eventually role-shaped — doers ask how-to questions, managers ask data questions

### Sandbox
- Bounded Claude Code environment for building personal dashboards, input forms, and tools
- Not publishable to the main app — it's a personal workspace for experimentation
- Users can build custom views of their data without engineering involvement
- If someone builds something great, it can inform what gets built into the core app
- Long-term bet: some power users may live in their sandbox more than the preconfigured app, and that's a feature not a bug

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS — full custom styling, no component libraries
- React Router — routing
- Framer Motion — panel slide animations, page transitions
- Recharts — charts for dashboard and analytics pages
- Lucide React — icons

Only add packages when needed. Keep the dependency list minimal. Radix UI primitives can be added later individually if a specific component needs production-grade a11y (focus trapping, keyboard nav in dialogs). Don't install packages speculatively.

## Design Requirements
- Base font size **16px** — anything smaller is unreadable for field workers
- Generous padding on table rows (py-4) and form inputs (py-3) — used by people in greenhouses, not at desks
- **rounded-2xl** on all cards, panels, buttons — consistent soft radius
- Primary gradient: **green-500 to emerald-600** with shadow-lg shadow-green-500/25 on key actions
- Side panel pattern: click table row → detail panel slides in from right with Framer Motion
- Phone view: bottom tab bar (max 5 tabs), no sidebar, compact header, renders inside phone frame (390x844)
- Computer view: full sidebar navigation, 72px header
- Segmented tab controls (pill-style within gray track) for filtering — not flat buttons
- Date-grouped table sections with colored header bars
- AI Insights prominent on dashboards — this is the core differentiator, not an afterthought
- **Minimal realistic content** on each screen — a few representative rows/items, not randomly generated bulk data
- Every screen should feel like a real app, not a skeleton or wireframe

## Prototype Navigation
- Floating toolbar fixed to bottom center of screen
- Left side: role switcher buttons (Doer | Doer+Recorder | Manager | Executive)
- Right side: device toggle (computer | phone icons)
- Switching role auto-selects that role's prime device and redirects to their home page
- Sidebar filters to only show pages the current role can access
- If current page isn't allowed for new role, redirect to role's home

## What the AI Orchestrator Does
The primary mission is deep AI integration. The AI will:
- Analyze operational data (harvest yields, chemistry readings, scouting reports)
- Assign work to humans it cannot complete itself
- Access tools within the app to offload work (schedule sprays, flag chemistry issues, create tasks)
- Provide a morning briefing per role on the dashboard
- Answer questions in chat scoped to the user's data and permissions
- Eventually be the orchestrator of farm logic instead of managers

## Farm Context
- Hawaii-based farm operation (Hawaii Farming)
- Primary crops: Cucumbers (Cuke), Lettuce
- 12 greenhouses: K0, 08, 01, HK, 07, WA, 04, 02, 06, H5, 05, 03
- Operational data: seeding cycles, harvest yields (lbs, Grade 1), chemistry (EC, pH, temp), scouting (IPM), spraying, fertilizer
- Key metrics: lb/hr/person efficiency, Grade 1 %, chemistry flag count
- Staff: ~42 active employees across grow, pack, maintenance, food safety

## Reference Apps
- **Linear** — table + detail panel, keyboard nav, command palette
- **Airtable** — view switching, grouped rows, multi-table
- **Tulip** — frontline ops forms, tablet UI, shift-based entry
- **Notion** — sidebar nav, database views, breadcrumbs
- **Retool** — table component, inline editing
- **Raycast** — command palette pattern
- **Figma** — dense input panel layout
- **Grafana** — time-series dashboards, date-grouped panels
