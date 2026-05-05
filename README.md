# 🚀 Team Task Manager (Full-Stack)

A full-stack web application where teams can manage projects, assign tasks, and track progress with **role-based access control (Admin / Member)**.

---



---

## 📂 GitHub Repository

🔗[ https://github.com/your-username/team-task-manager](https://github.com/Shadan0786/Team-Task-Manage)

---


## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Role-based access (Admin / Member)

### 📁 Project Management

* Admin can create & delete projects
* Assign members to projects
* Members can view only assigned projects

### ✅ Task Management

* Create tasks under projects
* Update task status (Pending → In Progress → Done)
* Delete tasks
* Tasks linked to specific projects

### 📊 Dashboard

* Total tasks count
* Completed tasks
* Overdue tasks

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Deployment

* Railway

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 API Endpoints (Sample)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects` (Admin)
* PUT `/api/projects/:id/add-member` (Admin)
* DELETE `/api/projects/:id` (Admin)

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`
* GET `/api/tasks/dashboard`

---

## 🔐 Role-Based Access

| Feature        | Admin | Member        |
| -------------- | ----- | ------------- |
| Create Project | ✅     | ❌             |
| Assign Members | ✅     | ❌             |
| View Projects  | All   | Assigned only |
| Create Tasks   | ✅     | ✅             |
| Update Tasks   | ✅     | Assigned only |

---

## 📸 Screenshots

(Add screenshots here if needed)

---

## 💡 Key Highlights

* Clean UI with Tailwind CSS
* Secure authentication with JWT
* Role-based access control (RBAC)
* Project-task relationship management
* Real-world team workflow implementation

---

## 🚀 Future Improvements

* Assign members via email instead of userId
* Notifications system
* Task deadlines & reminders
* Drag & drop task board (Kanban)

---

## 👨‍💻 Author

Shadan Ali

---

## 📌 Note

This project was built as part of a full-stack development assignment and demonstrates end-to-end application development including frontend, backend, database, and deployment.
