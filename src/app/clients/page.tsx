import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { clients, projectsByClient } from "@/lib/mock-data";

export default function ClientsPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="text-2xl font-semibold text-neutral-900">Clients</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Who your projects are for.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {clients.map((client) => {
          const clientProjects = projectsByClient(client.id);
          return (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm"
            >
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
                  <h2 className="font-medium text-neutral-900">
                    {client.name}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {client.contactName}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                {clientProjects.length}{" "}
                {clientProjects.length === 1 ? "project" : "projects"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
