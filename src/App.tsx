import { useState, useEffect } from "react";
import type { Task } from "./types";
import Kanban from "./components/Kanban";
import ListView from "./components/ListView";
import TimelineView from "./components/TimelineView";
import ViewButtons from "./components/ViewButtons";
import ActiveUsers from "./components/ActiveUsers";

function App() {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [users, setUsers] = useState([
    { id: "u1", name: "A", color: "bg-red-500", taskId: "1" },
    { id: "u2", name: "B", color: "bg-green-500", taskId: "2" },
    { id: "u3", name: "C", color: "bg-blue-500", taskId: "1" },
  ]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks([
        {
          id: "1",
          title: "Build UI",
          status: "todo",
          priority: "high",
          assignee: "1",
          dueDate: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Fix Bugs",
          status: "in-progress",
          priority: "medium",
          assignee: "2",
          dueDate: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // LIVE USERS MOVE
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((user) => {
          const randomTask =
            tasks[Math.floor(Math.random() * tasks.length)];
          return {
            ...user,
            taskId: randomTask?.id || user.taskId,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks]);

  // GENERATE 500 TASKS
  const generateTasks = () => {
    const statuses = ["todo", "in-progress", "review", "done"] as const;
    const priorities = ["low", "medium", "high", "critical"] as const;

    return Array.from({ length: 500 }, (_, i) => ({
      id: i.toString(),
      title: `Task ${i}`,
      status: statuses[Math.floor(Math.random() * 4)],
      priority: priorities[Math.floor(Math.random() * 4)],
      assignee: `${Math.floor(Math.random() * 6)}`,
      dueDate: new Date().toISOString(),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* 🔥 RESPONSIVE LAYOUT */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ✅ SIDEBAR */}
        <div className="w-full lg:w-64 bg-gray-900 p-4 border-b lg:border-b-0 lg:border-r border-gray-800">
          <h2 className="text-xl font-bold mb-6">Click Me</h2>

          <ViewButtons
            setView={setView}
            addTask={() =>
              setTasks((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  title: "New Task",
                  status: "todo",
                  priority: "medium",
                  assignee: "1",
                  dueDate: new Date().toISOString(),
                },
              ])
            }
            generateTasks={() => setTasks(generateTasks())}
          />
        </div>

        {/* ✅ MAIN CONTENT */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Project Tracker
            </h1>

            <ActiveUsers users={users} viewerCount={10} />
          </div>

          {/* CONTENT */}
          <div className="bg-gray-900 p-3 sm:p-4 rounded-xl flex-1 overflow-auto">
            {view === "kanban" && (
              <Kanban
                tasks={tasks}
                setTasks={setTasks}
                setEditingTask={setEditingTask}
                users={users}
              />
            )}

            {view === "list" && <ListView tasks={tasks} />}
            {view === "timeline" && <TimelineView tasks={tasks} />}
          </div>
        </div>
      </div>

      {/* ✅ MODAL RESPONSIVE */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-xl w-full max-w-md">

            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Edit Task
            </h2>

            <input
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
            />

            <input
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              value={editingTask.assignee}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  assignee: e.target.value,
                })
              }
            />

            <select
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              value={editingTask.status}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  status: e.target.value as Task["status"],
                })
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>

            <div className="flex justify-end gap-2 flex-wrap">
              <button
                className="px-3 py-1 bg-gray-600 rounded"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 bg-blue-600 rounded"
                onClick={() => {
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === editingTask.id ? editingTask : t
                    )
                  );
                  setEditingTask(null);
                }}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;