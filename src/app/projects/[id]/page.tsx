import { notFound } from "next/navigation";
import { KanbanBoard } from "@/components/kanban-board";
import { projectById, tasksByProject } from "@/lib/mock-data";

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

        <div className="mt-6">
          <KanbanBoard tasks={projectTasks} />
        </div>
      </div>
    </div>
  );
}
