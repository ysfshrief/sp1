# Special 1 — Hady Attia

A platform for the English centre of **Mr. Hady Attia** — built like a real Egyptian tutoring centre (سنتر), not an online course site.

Designed & developed by **Youssef Shrief**.

Built with React 18 + Vite. Ready to deploy on Netlify.

---

## What's inside

**For students (mobile-first):**
- Home that leads with this week's homework, recitation, next exam, and the teacher's note
- All homework & recitation with PDF preview / download
- A personal **QR pass** for attendance
- Group schedule, grades, attendance %, and notifications

**For the secretary (fast operations console):**
- Front-desk overview with today's groups
- **QR attendance** — scan students in at the door, with manual entry as backup, present/absent/rate, per-student method & time
- **Groups** — create, edit schedules, move students, merge, and cancel groups (nothing is hardcoded)
- **Students** — search, filter, add/edit, move group, view/print QR
- **Publish lesson** — the post-lesson workflow: title, homework (+PDF), recitation (+PDF), "exam next lesson?", notes → Publish → every student's dashboard updates
- **PDF library** — homework, recitation, worksheets, booklets, revision files, exams
- **Announcements** — post notices to all groups or one stage

The 14 real groups from the centre are loaded as starting data and are fully editable.

---

## Before you launch — add two images

Put these in the `public/` folder (see `public/README-PLACEHOLDERS.txt`):
- Mr. Hady's photo and the logo are already processed (backgrounds removed) and placed in `public/`


Both have tasteful placeholders until you add them, so the site looks finished either way.

---

## Demo logins
- **Secretary:** secretary@special1.com / 123456
- **Student:** student@special1.com / 123456

---


## Centre details (already in the site)
- **Secretary:** +20 10 70879401 · +20 10 32678576 (each opens a Call / WhatsApp chooser)
- **Address:** شارع السد العالي أمام الشعلة للايس كريم بجوار مدرسة التحرير
- **Working hours:** 1:00 PM – 8:00 PM

## Deploy to Netlify

### Option A — Drag & drop
On your computer (needs Node.js 18+ from nodejs.org):
```
npm install
npm run build
```
Then drag the new **`dist`** folder onto https://app.netlify.com/drop.

### Option B — Connect a Git repo (recommended)
1. Push this folder to GitHub.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml` automatically (build `npm run build`, publish `dist`). Deploy.

### Option C — Netlify CLI
```
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

---

## Run locally
```
npm install
npm run dev
```

## A note on the QR scanner
The attendance camera needs **HTTPS** and camera permission. Netlify serves every site over HTTPS, so it works once deployed. On a desktop without a camera, use the manual code entry (e.g. `S1042`) or tap a student in the roster.

## A note on data
This build keeps everything in the browser's memory, so it's perfect for a live demo — but changes reset on refresh. To make groups, students, attendance and published lessons persist, the next step is a small backend (or a hosted database). That can be added without changing the interface.

---

© Special 1 — Hady Attia · Designed & developed by Youssef Shrief · Web Development
