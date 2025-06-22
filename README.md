🔐 Voucher Management Frontend


for login- email:admin@example.com
           password:admin@123
           
A modern, fully responsive React 19 frontend built with TypeScript, designed for managing and distributing vouchers with JWT-based login, a clean dashboard, and CRUD functionality.

✨ Features
🔐 JWT Authentication – Secure login system.

🎟️ Voucher CRUD – Create, update, delete, and manage vouchers.

👥 Voucher Distribution – Assign vouchers to users via modal.

📊 Dashboard – Simple and clean analytics/overview page.

🌙 Fully Responsive UI – Optimized for all screen sizes.

⚙️ Micro Folder Structure – Scalable and maintainable codebase.

🔁 React Hook Form + Zod – Type-safe form handling & validation.

📦 State Management with Zustand – Lightweight and intuitive.

💨 Styled with Tailwind CSS + ShadCN – Utility-first + accessible components.

🔔 Notifications with React Toastify – Smooth user feedback system.



| Tech                | Usage                        |
| ------------------- | ---------------------------- |
| **React 19**        | UI development               |
| **TypeScript**      | Static typing                |
| **Tailwind CSS**    | Styling (utility-first)      |
| **ShadCN**          | UI Components                |
| **Zustand**         | Global state management      |
| **React Hook Form** | Form handling                |
| **Zod**             | Schema-based form validation |
| **React Router**    | Client-side routing          |
| **React Toastify**  | Notifications                |
| **Axios**           | HTTP Requests                |


src/
├── components/       # Reusable UI components (e.g., Card, Modal)
├── pages/            # Page-level components (Login, Dashboard, Vouchers)
├── hooks/            # Custom hooks (zustand stores, form hooks)
├── utils/            # Utility functions (formatters, API, toast, etc.)
├── validation/       # Zod schemas for forms
├── routes/           # All routes managed with React Router
├── assets/           # Static images or icons
├── App.tsx
└── main.tsx
