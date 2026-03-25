type Props = {
  setView: (view: "kanban" | "list" | "timeline") => void;
  addTask: () => void;
  generateTasks: () => void;
};

export default function ViewButtons({
  setView,
  addTask,
  generateTasks,
}: Props) {
  return (
    <div className="flex flex-col h-full">

      {/* TOP SECTION (VIEWS) */}
      <div className="flex flex-col gap-4">

        <p className="text-gray-400 text-xs uppercase">Views</p>

        <button
          onClick={() => setView("kanban")}
          className="px-5 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 active:scale-95 transition"
        >
          Kanban
        </button>

        <button
          onClick={() => setView("list")}
          className="px-5 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 active:scale-95 transition"
        >
          List
        </button>

        <button
          onClick={() => setView("timeline")}
          className="px-5 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 active:scale-95 transition"
        >
          Timeline
        </button>
      </div>

      {/* 🔹 BOTTOM SECTION (ACTIONS) */}
      <div className="flex flex-col gap-4 mt-10">

        <p className="text-gray-400 text-xs uppercase">Actions</p>

        <button
          onClick={addTask}
          className="px-5 py-3 bg-blue-800 rounded-xl hover:bg-blue-700 active:scale-95 transition"
        >
          + Add Task
        </button>

        <button
          onClick={generateTasks}
          className="px-5 py-3 bg-purple-800 rounded-xl hover:bg-purple-700 active:scale-95 transition"
        >
          Generate Tasks
        </button>

      </div>
    </div>
  );
}