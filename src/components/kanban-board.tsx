"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { KanbanColumn } from "@/components/kanban-column";
import { TaskCard } from "@/components/task-card";
import type { Task, TaskPriority, TaskStatus } from "@/lib/mock-data";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "in_progress", label: "In progress" },
  { status: "done", label: "Done" },
];

const PRIORITY_RANK: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function sortByPriority(list: Task[]): Task[] {
  return [...list].sort(
    (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
  );
}

type ColumnState = Record<TaskStatus, Task[]>;

function groupByStatus(tasks: Task[]): ColumnState {
  return {
    todo: sortByPriority(tasks.filter((t) => t.status === "todo")),
    in_progress: sortByPriority(
      tasks.filter((t) => t.status === "in_progress"),
    ),
    done: sortByPriority(tasks.filter((t) => t.status === "done")),
  };
}

function isTaskStatus(id: string): id is TaskStatus {
  return id === "todo" || id === "in_progress" || id === "done";
}

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const [columns, setColumns] = useState<ColumnState>(() =>
    groupByStatus(tasks),
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
      const toTasks = sortByPriority([
        ...prev[toStatus],
        { ...moved, status: toStatus },
      ]);

      return { ...prev, [fromStatus]: fromTasks, [toStatus]: toTasks };
    });
  }

  function handleDragEnd() {
    setActiveTask(null);
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
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
