This project uses react-router-dom v6 with a centralized router at src/routes/index.js.

Routes:
- /login -> Login page
- /dashboard -> Giant Anteater dashboard (default redirect from /)
- /animals -> Animals list
- /timeline -> Events/timeline
- /reports -> Reports preview
- /chat -> Chat placeholder
- * -> NotFound

Layout:
- MainLayout renders TopBar, SideNav, and an Outlet for page content.
- Ocean Professional theme variables live in src/styles/theme.css.

Notes:
- This is a mock-only implementation for Phase 1 preview. Integrate real services later.
