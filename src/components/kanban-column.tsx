"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTaskCard } from "@/components/sortable-task-card";
import type { Task, TaskStatus } from "@/lib/mock-data";

export function KanbanColumn({
  status,
  label,
  tasks,
}: {
  status: TaskStatus;
  label: string;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="rounded-lg bg-neutral-100 p-3">
      <div className="flex items-center justify-between px-1 pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
          {label}
        </h2>
        <span className="text-xs text-neutral-500">{tasks.length}</span>
      </div>
      <SortableContext
        id={status}
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="min-h-[60px] space-y-2">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <p className="px-1 py-2 text-xs text-neutral-400">No tasks</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
