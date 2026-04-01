# AlgoLabs - Interactive DSA Learning Laboratory

![AlgoLabs Dashboard](media/landing_page.png)

AlgoLabs is an interactive, complete DSA EdTech platform designed to help students and developers master Data Structures and Algorithms through a structured curriculum, embedded video lectures, step-by-step logic visual animations, and an AI assistant powered by Gemini.

## 🚀 Key Features

- **Complete DSA Curriculum**: Structured learning modules covering Arrays, Linked Lists, Stacks, Queues, Sorting, Searching, Trees, and Graphs.
- **Dual-Pane Learning**: Watch curated YouTube lectures, while simultaneously interacting with the real-time visualizer.
- **Step-by-Step Code Tracker**: The dynamic "Logic View" highlights exactly what lines of code are executing, alongside an explanation of the logical step.
- **AI Learning Assistant**: Integrated chat panel using the Gemini API. Ask the assistant to re-explain a complex concept or trace an iteration.
- **Feedback Mechanism**: Embedded feedback forms backed by a secure Cloudflare D1 database.
- **Premium User Experience**: Glassmorphism UI, Dark Mode support, and fluid Framer Motion animations.

## 🛠️ Technology Stack

### Frontend Architecture
- **React 18** and **TypeScript** (Vite Scaffold)
- **Tailwind CSS v4** for utility-first styling with premium CSS variables
- **React Router v6** for course module navigation
- **Framer Motion** for spring physics and layout animations
- **Lucide React** for modern iconography

### Backend (Cloudflare Edge Architecture)
- **Cloudflare Workers** utilizing **Hono.js** framework
- **Cloudflare D1** (Serverless SQLite DB) for Feedback Storage
- **Gemini API Proxy** to securely mask secrets while providing AI capabilities

## 📦 Local Setup & Execution

### Prerequisites
- Node.js (v18+)
- NPM or PNPM
- `wrangler` CLI installed globally

### 1. Backend Setup

```bash
cd backend-cf
npm install

# Initialize local SQLite for D1 database
npm run db:init

# Start the Cloudflare Worker server locally (Port 8787)
npm run dev
```

### 2. Frontend Setup

In a new terminal window:
```bash
cd frontend
npm install

# Start the Vite React compiler (Port 5173)
npm run dev
```

Navigate to `http://localhost:5173` to explore the dashboard.

## 👥 Meet the Developers

*   **Ayush**: Frontend & Algorithm Interactivity (LinkedIn)
*   **Divya**: Backend, Cloudflare & Database (LinkedIn)

## 🤝 Open Contribution

AlgoLabs welcomes the developer community! If you wish to improve a visualization, trace new algorithms, or write better theory explanations:

1.  Fork the repository.
2.  Install all dependencies and ensure local D1 works.
3.  Commit your features or bugfixes.
4.  Open a Pull Request.

> See the Feedback Admin Panel locally: `http://localhost:5173/admin/feedback`.

## 📄 License & Deployment

This project is open-source. For cloud deployment:
1.  Connect Cloudflare with your GitHub Repo.
2.  Create a remote D1 database named `algolabs-db` and update `wrangler.toml`.
3.  Add `GEMINI_API_KEY` to the Cloudflare Worker Secrets.
4.  Deploy `backend-cf` using `wrangler deploy`.
5.  Deploy the frontend build folder `dist` to Cloudflare Pages mapping the API base URL.
