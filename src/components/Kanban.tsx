import type { Task } from "../types";
import React from "react";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setEditingTask: (task: Task) => void;
  users: any[];
};

const columns = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "review", label: "In Review" },
  { key: "done", label: "Done" },
] as const;

export default function Kanban({
  tasks,
  setTasks,
  setEditingTask,
  users,
}: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-96 lg:min-w-0">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("taskId");

                setTasks((prev) =>
                  prev.map((task) =>
                    task.id === id
                      ? { ...task, status: col.key }
                      : task
                  )
                );
              }}
              className="bg-gray-800 p-4 rounded-xl min-h-56"
            >
              <h3 className="font-bold mb-4 text-sm sm:text-base">
                {col.label} ({colTasks.length})
              </h3>

              {colTasks.length === 0 && (
                <p className="text-gray-400 text-sm">No tasks</p>
              )}

              {colTasks.map((task) => {
                const taskUsers = users.filter(
                  (u) => u.taskId === task.id
                );

                return (
                  <div
                    key={task.id}
                    draggable
                    onClick={() => setEditingTask(task)}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("taskId", task.id)
                    }
                    className="bg-gray-100 text-black p-3 mb-3 rounded-xl shadow hover:scale-105 transition text-sm sm:text-base"
                  >
                    <h4 className="font-semibold">{task.title}</h4>

                    <p className="text-xs sm:text-sm">
                      👤 {task.assignee}
                    </p>

                    <p className="text-xs sm:text-sm">
                      ⚡ {task.priority}
                    </p>

                    <p className="text-xs sm:text-sm">
                      📅 {new Date(task.dueDate).toDateString()}
                    </p>

                    {/* USERS */}
                    <div className="flex mt-2 -space-x-2">
                      {taskUsers.slice(0, 3).map((u) => (
                        <div
                          key={u.id}
                          className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center text-white ${u.color}`}
                        >
                          {u.name}
                        </div>
                      ))}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTasks((prev) =>
                            prev.filter((t) => t.id !== task.id)
                          );
                        }}
                        className="text-red-500 text-xs sm:text-sm"
                      >
                        Delete
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTask(task);
                        }}
                        className="text-blue-500 text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}