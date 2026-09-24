import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { clientById, projectsByClient, tasksByProject } from "@/lib/mock-data";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = clientById(id);
  if (!client) notFound();

  const clientProjects = projectsByClient(id);

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <div className="flex items-center gap-3">
        <Avatar
          user={{
            id: client.id,
            name: client.name,
            initials: client.initials,
            color: client.color,
          }}
          size="lg"
        />
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {client.name}
          </h1>
          <p className="text-sm text-neutral-500">
            {client.contactName} &middot; {client.contactEmail}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-900">Projects</h2>
        <div className="mt-3 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
          {clientProjects.map((project) => {
            const projectTasks = tasksByProject(project.id);
            const done = projectTasks.filter((t) => t.status === "done").length;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
                  <span className="font-medium text-neutral-900">
                    {project.name}
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  {done}/{projectTasks.length} tasks done
                </span>
              </Link>
            );
          })}
          {clientProjects.length === 0 && (
            <p className="px-4 py-3 text-sm text-neutral-400">
              No projects for this client yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
