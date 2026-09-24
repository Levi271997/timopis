"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { SortMode } from "@/components/kanban-board";
import { SortableTaskCard } from "@/components/sortable-task-card";
import type { Task, TaskStatus } from "@/lib/mock-data";

const SORT_MODE_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "high-low", label: "Priority: High → Low" },
  { value: "low-high", label: "Priority: Low → High" },
  { value: "free", label: "Free reorder" },
];

export function KanbanColumn({
  status,
  label,
  tasks,
  sortMode,
  onSortModeChange,
}: {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
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

      <select
        value={sortMode}
        onChange={(e) => onSortModeChange(e.target.value as SortMode)}
        className="mb-2 w-full rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700"
      >
        {SORT_MODE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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
