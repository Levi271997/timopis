"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanColumn } from "@/components/kanban-column";
import { TaskCard } from "@/components/task-card";
import type { Task, TaskPriority, TaskStatus } from "@/lib/mock-data";

export type SortMode = "high-low" | "low-high" | "free";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "in_progress", label: "In progress" },
  { status: "done", label: "Done" },
];

const DEFAULT_SORT_MODES: Record<TaskStatus, SortMode> = {
  todo: "high-low",
  in_progress: "high-low",
  done: "high-low",
};

const PRIORITY_RANK: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function sortTasks(list: Task[], mode: SortMode): Task[] {
  if (mode === "free") return list;
  const sorted = [...list].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
  );
  return mode === "low-high" ? sorted.reverse() : sorted;
}

type ColumnState = Record<TaskStatus, Task[]>;

function groupByStatus(
  tasks: Task[],
  sortModes: Record<TaskStatus, SortMode>,
): ColumnState {
  return {
    todo: sortTasks(
      tasks.filter((t) => t.status === "todo"),
      sortModes.todo,
    ),
    in_progress: sortTasks(
      tasks.filter((t) => t.status === "in_progress"),
      sortModes.in_progress,
    ),
    done: sortTasks(
      tasks.filter((t) => t.status === "done"),
      sortModes.done,
    ),
  };
}

function isTaskStatus(id: string): id is TaskStatus {
  return id === "todo" || id === "in_progress" || id === "done";
}

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const [sortModes, setSortModes] =
    useState<Record<TaskStatus, SortMode>>(DEFAULT_SORT_MODES);
  const [columns, setColumns] = useState<ColumnState>(() =>
    groupByStatus(tasks, DEFAULT_SORT_MODES),
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function columnOf(taskId: string): TaskStatus | undefined {
    return (Object.keys(columns) as TaskStatus[]).find((status) =>
      columns[status].some((t) => t.id === taskId),
    );
  }

  function handleSortModeChange(status: TaskStatus, mode: SortMode) {
    setSortModes((prev) => ({ ...prev, [status]: mode }));
    setColumns((prev) => ({
      ...prev,
      [status]: sortTasks(prev[status], mode),
    }));
  }

  function handleDragStart(event: DragStartEvent) {
    const status = columnOf(event.active.id as string);
    if (!status) return;
    setActiveTask(columns[status].find((t) => t.id === event.active.id) ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const fromStatus = columnOf(activeId);
    const toStatus = isTaskStatus(overId) ? overId : columnOf(overId);
    if (!fromStatus || !toStatus || fromStatus === toStatus) return;

    setColumns((prev) => {
      const fromTasks = [...prev[fromStatus]];
      const taskIndex = fromTasks.findIndex((t) => t.id === activeId);
      if (taskIndex === -1) return prev;

      const [moved] = fromTasks.splice(taskIndex, 1);
      const movedTask = { ...moved, status: toStatus };
      const toMode = sortModes[toStatus];

      let toTasks: Task[];
      if (toMode === "free") {
        toTasks = [...prev[toStatus]];
        const overIndex = toTasks.findIndex((t) => t.id === overId);
        const insertAt = overIndex >= 0 ? overIndex : toTasks.length;
        toTasks.splice(insertAt, 0, movedTask);
      } else {
        toTasks = sortTasks([...prev[toStatus], movedTask], toMode);
      }

      return { ...prev, [fromStatus]: fromTasks, [toStatus]: toTasks };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (isTaskStatus(overId) || overId === activeId) return;

    const status = columnOf(activeId);
    if (!status || sortModes[status] !== "free") return;

    const columnTasks = columns[status];
    const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
    const newIndex = columnTasks.findIndex((t) => t.id === overId);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    setColumns((prev) => ({
      ...prev,
      [status]: arrayMove(prev[status], oldIndex, newIndex),
    }));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            label={column.label}
            tasks={columns[column.status]}
            sortMode={sortModes[column.status]}
            onSortModeChange={(mode) =>
              handleSortModeChange(column.status, mode)
            }
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
