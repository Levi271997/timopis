import Link from "next/link";
import { projects, tasksByProject } from "@/lib/mock-data";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="text-2xl font-semibold text-neutral-900">Projects</h1>
      <p className="mt-1 text-sm text-neutral-500">
        All the work your team is tracking.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {projects.map((project) => {
          const projectTasks = tasksByProject(project.id);
          const done = projectTasks.filter((t) => t.status === "done").length;
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
                <h2 className="font-medium text-neutral-900">{project.name}</h2>
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {project.description}
              </p>
              <p className="mt-4 text-xs text-neutral-500">
                {done}/{projectTasks.length} tasks done
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
