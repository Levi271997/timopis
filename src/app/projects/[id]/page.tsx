import { notFound } from "next/navigation";
import { TaskCard } from "@/components/task-card";
import { projectById, tasksByProject, type TaskStatus } from "@/lib/mock-data";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "in_progress", label: "In progress" },
  { status: "done", label: "Done" },
];

export default async function ProjectBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectById(id);
  if (!project) notFound();

  const projectTasks = tasksByProject(id);

  return (
    <div className="px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
          <h1 className="text-2xl font-semibold text-neutral-900">
            {project.name}
          </h1>
        </div>
        <p className="mt-1 text-sm text-neutral-500">{project.description}</p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {COLUMNS.map((column) => {
            const columnTasks = projectTasks.filter(
              (t) => t.status === column.status,
            );
            return (
              <div key={column.status} className="rounded-lg bg-neutral-100 p-3">
                <div className="flex items-center justify-between px-1 pb-2">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                    {column.label}
                  </h2>
                  <span className="text-xs text-neutral-500">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {columnTasks.length === 0 && (
                    <p className="px-1 py-2 text-xs text-neutral-400">
                      No tasks
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
