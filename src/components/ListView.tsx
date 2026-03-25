import { useState } from "react";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
};

const ROW_HEIGHT = 60;
const BUFFER = 5;

export default function ListView({ tasks }: Props) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = tasks.length * ROW_HEIGHT;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
  );

  const visibleTasks = tasks.slice(startIndex, startIndex + 15);

  return (
    <div
      className="h-56 overflow-y-auto bg-gray-900 rounded-xl"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleTasks.map((task, i) => {
          const index = startIndex + i;

          return (
            <div
              key={task.id}
              style={{
                position: "absolute",
                top: index * ROW_HEIGHT,
                left: 0,
                right: 0,
                height: ROW_HEIGHT,
              }}
              className="flex justify-between px-4 items-center border-b border-gray-700"
            >
              <span>{task.title}</span>
              <span>{task.assignee}</span>
              <span>{task.priority}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}