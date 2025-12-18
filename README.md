# 🚀 CodeConnect - Real-Time Collaborative Interview Platform

**CodeConnect** is a cutting-edge, full-stack platform designed to streamline remote technical interviews. It integrates high-quality video conferencing with a real-time collaborative code editor, allowing interviewers and candidates to interact as if they were in the same room.

🔗 **Live Demo:** [code-connect-v1.vercel.app](https://code-connect-v1.vercel.app/)

## ✨ Key Features

-   **🎥 Integrated Video Conferencing:** Powered by **Stream Video SDK**, offering low-latency audio/video calls with recording capabilities.
-   **💻 Collaborative Code Editor:** Real-time multi-user coding experience using **Monaco Editor** and **Liveblocks (Yjs)** for conflict-free collaboration.
-   **🔐 Role-Based Access Control:** Distinct workflows for **Interviewers** (scheduling, dashboards, feedback) and **Candidates** (joining, coding).
-   **⚡ Live Execution:** Instant code evaluation to test logic during the session.
-   **📅 Structured Dashboard:** Interviewers can manage upcoming sessions, review previous recordings, and provide structured feedback.
-   **🛡️ Secure Auth:** Robust authentication and user management via **Clerk**.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, GSAP |
| **Authentication** | Clerk |
| **Database** | MongoDB (Mongoose) |
| **Real-time Engine** | Liveblocks, Yjs |
| **Video/Audio** | Stream Video SDK |
| **Code Editor** | Monaco Editor |
| **Validation** | Zod, React Hook Form |

## 📂 Project Structure (App Router)

```text
app/
 ┣ (app)        # Main application (Dashboard, About, Contact)
 ┣ (auth)       # Authentication (Sign-in, Sign-up)
 ┣ (meet)       # Real-time meeting room & lobby logic
 ┣ api          # Backend routes (Clerk webhooks, Meeting CRUD)
