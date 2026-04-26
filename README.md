# Content Broadcasting System (Backend)

## 🚀 Tech Stack

* Node.js (Express)
* PostgreSQL
* JWT Authentication
* Multer (File Upload)

---

## 📌 Features

* JWT-based Authentication
* Role-Based Access Control (Teacher / Principal)
* Content Upload System
* Approval Workflow
* Scheduling & Rotation Logic
* Public Broadcasting API
* Edge Case Handling

---

## 🔐 Roles

### Teacher

* Upload content
* Add scheduling

### Principal

* Approve / Reject content

---

## 🔄 Content Lifecycle

uploaded → pending → approved / rejected

---

## 🌍 Public API

GET /content/live/:teacherId

Returns active content based on:

* Approval status
* Time window
* Rotation logic

---

## ⚙️ Setup Instructions

1. Clone repo

2. Install dependencies:
   npm install

3. Setup database

4. Start server:
   npm run dev

---

## 🧠 Key Logic

Rotation is handled using:
current_time % total_duration

---

## 📄 Architecture Notes

Refer to architecture-notes.txt
