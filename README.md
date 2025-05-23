# patient-portal-medblocks
# 🏥 Patient Registration App
A **frontend-only** patient registration app built with **React** and **Pglite**. This app allows users to register new patients, run raw SQL queries, and ensures persistence and real-time sync across tabs—all without a backend server.

**Live Demo:** [https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)

## ⚙️ Features
### Patient Registration
- Add new patients with name, age, and medical condition.
- View registered patients in a dynamic table.

### Raw SQL Queries
- Use the Admin panel to write and execute raw SQL queries directly on the local Pglite database.

### Persistent Data
- Patient data is saved to **IndexedDB** using **Pglite**, ensuring data is preserved across page reloads.

### Multi-tab Sync
- Uses the **BroadcastChannel API** to keep data in sync across all open tabs in the browser in real-time.

### Visual Interaction
- Rotating icon circle on the homepage that:
  - Animates icons around a circle.
  - Pauses rotation on hover.
  - Navigates or opens links on click.

## 🛠️ Technologies Used
- **React** – UI Framework
- **Pglite** – In-browser SQLite database
- **BroadcastChannel API** – Multi-tab data sync
- **Font Awesome** – Icons
- **CSS Animations** – Rotating icons
- **Vite** – Fast development build tool

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/diya-basu/patient-portal-medblocks.git
cd patient-portal-medblocks
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App Locally
```bash
npm run dev
```

## ⚠️ Known Limitations
- All data is stored locally; no cloud or backend database is involved.
- Since it's frontend-only, access is limited to the user's browser.

## 💡 Challenges Faced
- **IndexedDB + Pglite quirks:** Managing schema and persistent writes reliably using Pglite inside IndexedDB required custom handling and retries.
- **BroadcastChannel timing:** Ensuring synchronization worked correctly across tab closures and re-openings.
- **Rotating icon coordination:** Handling smooth rotation with tooltips, individual click behavior, and responsive pausing was tricky and required precise CSS and JS coordination.

## 👩‍💻 Developed By
Diya Basu
www.diyabasu.com
