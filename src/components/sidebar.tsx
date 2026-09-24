"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { channels, currentUser, projects } from "@/lib/mock-data";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
        active
          ? "bg-neutral-800 text-white"
          : "text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-100"
      }`}
    >
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-neutral-800 bg-neutral-900 text-neutral-100">
      <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500 text-sm font-bold text-white">
          T
        </span>
        <span className="text-sm font-semibold">Timopis</span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          <NavLink href="/" label="Dashboard" />
          <NavLink href="/projects" label="Projects" />
          <NavLink href="/clients" label="Clients" />
          <NavLink href="/chat" label="Chat" />
        </div>

        <div>
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Projects
          </p>
          <div className="space-y-1">
            {projects.map((project) => (
              <NavLink
                key={project.id}
                href={`/projects/${project.id}`}
                label={project.name}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Channels
          </p>
          <div className="space-y-1">
            {channels.map((channel) => (
              <Link
                key={channel.id}
                href={`/chat/${channel.id}`}
                className="flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-100"
              >
                <span>{channel.isPrivate ? "🔒" : "#"} {channel.name}</span>
                {channel.unread > 0 && (
                  <span className="rounded-full bg-violet-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {channel.unread}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex items-center gap-2 border-t border-neutral-800 px-4 py-3">
        <Avatar user={currentUser} size="sm" />
        <span className="text-sm text-neutral-300">{currentUser.name}</span>
      </div>
    </aside>
  );
}
