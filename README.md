# 🚀 Project Tracker UI

This is a frontend project management tool built as part of an assignment to test real-world frontend engineering skills like state management, performance optimization, and UI logic.

The goal was not just to design a UI, but to build a scalable and efficient system that can handle large datasets, multiple views, and interactive features like drag-and-drop.

---

## ✨ Features

### 🔄 Multiple Views (Same Data)

* **Kanban View**

  * Tasks organized into 4 columns: To Do, In Progress, In Review, Done
  * Each task shows title, assignee initials, priority, and due date
  * Columns scroll independently

* **List View**

  * All tasks displayed in a sortable table
  * Sorting by title, priority, and due date
  * Inline status update using dropdown

* **Timeline View**

  * Tasks visualized across a timeline (Gantt-style)
  * Bars represent task duration
  * Today's date is highlighted

---

### 🎯 Custom Drag and Drop

* Built from scratch (no libraries used)
* Drag tasks between columns
* Placeholder appears while dragging
* Smooth snap-back if dropped outside valid area
* Works on mouse (touch support in progress)

---

### ⚡ Performance (Virtual Scrolling)

* Only visible rows are rendered in List View
* Handles large datasets (500+ tasks)
* Smooth scrolling without lag or flickering

---

### 👥 Live Collaboration Simulation

* Simulated users viewing/editing tasks
* Avatar indicators on active tasks
* Dynamic "people viewing" count

---

### 🔍 Filters & URL Sync

* Filter by:

  * Status
  * Priority
  * Assignee
  * Date range
* Filters update instantly
* State synced with URL (shareable links)

---

### 🧠 Edge Cases Handled

* Empty states for columns and list
* "Due Today" label
* Overdue tasks highlight
* Tasks without start date handled in timeline

---

## 🛠 Tech Stack

* React + TypeScript
* Tailwind CSS
* Zustand (for global state management)

---

## ⚙️ Setup Instructions

```bash
npm install
npm run dev
```

---

## 🧩 State Management

Zustand is used because:

* Lightweight and simple
* No boilerplate like Redux
* Easy global state sharing across views

---

## ⚡ Virtual Scrolling Approach

Instead of rendering all rows:

* Only visible rows + buffer are rendered
* Scroll height is maintained using a spacer div
* Improves performance significantly for large datasets

---

## 🎯 Drag and Drop Approach

* Used native pointer events
* Calculated drop zones manually
* Placeholder added to avoid layout shift
* Position tracked using mouse coordinates

---

## 📊 Performance

Lighthouse Score: 85+ (Desktop)

---

## 📌 Future Improvements

* Make UI fully responsive
* Improve touch support for drag-and-drop
* Add backend for real-time collaboration

---
