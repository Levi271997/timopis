import Link from "next/link";
import { Avatar } from "@/components/avatar";
import {
  currentUser,
  projectById,
  tasks,
  userById,
} from "@/lib/mock-data";

const STATUS_LABEL: Record<string, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export default function DashboardPage() {
  const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id);
  const counts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Welcome back, {currentUser.name.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Here&apos;s what&apos;s happening across your projects.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {(["todo", "in_progress", "done"] as const).map((status) => (
          <div
            key={status}
            className="rounded-lg border border-neutral-200 bg-white p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {STATUS_LABEL[status]}
            </p>
            <p className="mt-1 text-2xl font-semibold text-neutral-900">
              {counts[status]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-900">My tasks</h2>
        <div className="mt-3 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
          {myTasks.map((task) => {
            const project = projectById(task.projectId);
            return (
              <Link
                key={task.id}
                href={`/projects/${task.projectId}`}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50"
              >
                <div>
                  <p className="font-medium text-neutral-900">{task.title}</p>
                  <p className="text-xs text-neutral-500">{project?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  {task.dueDate && (
                    <span className="text-xs text-neutral-500">
                      Due {task.dueDate}
                    </span>
                  )}
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                    {STATUS_LABEL[task.status]}
                  </span>
                  <Avatar user={userById(task.assigneeId)} size="sm" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
