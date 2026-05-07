# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

This is a **static HTML-only** Teacher Administration Management System (教師行政管理系統). There is no build system, no package manager, no backend, and no dependencies to install. The entire application is self-contained in standalone `.html` files.

### Running the Application

Serve the workspace with any static HTTP server:

```
python3 -m http.server 8000 --directory /workspace
```

Then open a browser to `http://localhost:8000/1_範本系統（可直接使用）/` and select one of the HTML files.

Key application files:
- `1_範本系統（可直接使用）/教師行政管理系統_示範版（Demo）.html` — Demo version (recommended for testing)
- `1_範本系統（可直接使用）/教師行政管理系統_更新版（44教師代號模式）.html` — Full 44-teacher version
- `1_範本系統（可直接使用）/教師行政管理系統_簡易範本（12教師測試版）.html` — Simple 12-teacher version with Chinese code comments

### Lint / Tests / Build

There is no linter, no test framework, and no build step. Validation consists of:
- Opening the HTML files in a browser and verifying they render correctly
- Checking that CDN resources (Tailwind CSS, Font Awesome, Google Fonts) load on first page load

### Important Notes

- The HTML files use CDN-loaded Tailwind CSS, Font Awesome, and Google Fonts. An internet connection is needed on first load; afterwards files work offline.
- All teacher timetable data is hardcoded inside each HTML file — there is no database or API.
- Chinese characters in file/directory names require URL-encoding when accessed via HTTP.
