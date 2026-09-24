import { Avatar } from "@/components/avatar";
import type { Task } from "@/lib/mock-data";
import { userById } from "@/lib/mock-data";

const PRIORITY_STYLE: Record<Task["priority"], string> = {
  high: "bg-red-50 text-red-700",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-neutral-100 text-neutral-600",
};

export function TaskCard({ task }: { task: Task }) {
  const assignee = userById(task.assigneeId);

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-3 shadow-sm">
      <p className="text-sm font-medium text-neutral-900">{task.title}</p>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${PRIORITY_STYLE[task.priority]}`}
        >
          {task.priority}
        </span>
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span className="text-[11px] text-neutral-500">{task.dueDate}</span>
          )}
          <Avatar user={assignee} size="sm" />
        </div>
      </div>
    </div>
  );
}
