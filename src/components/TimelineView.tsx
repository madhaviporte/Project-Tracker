import type { Task } from "../types";

export default function TimelineView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-gray-800 p-3 rounded">
          <h3>{task.title}</h3>
          <p className="text-sm text-gray-400">
            Due: {new Date(task.dueDate).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}