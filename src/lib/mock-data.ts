export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type User = {
  id: string;
  name: string;
  initials: string;
  color: string;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string | null;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type Channel = {
  id: string;
  name: string;
  isPrivate: boolean;
  unread: number;
};

export type Message = {
  id: string;
  channelId: string;
  authorId: string;
  body: string;
  time: string;
};

export const users: User[] = [
  { id: "u1", name: "Levi Jan", initials: "LJ", color: "bg-violet-500" },
  { id: "u2", name: "Mira Santos", initials: "MS", color: "bg-emerald-500" },
  { id: "u3", name: "Theo Park", initials: "TP", color: "bg-amber-500" },
  { id: "u4", name: "Ada Ruiz", initials: "AR", color: "bg-sky-500" },
];

export const currentUser = users[0];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Timopis Launch",
    description: "Ship the v1 app to the team.",
    color: "bg-violet-500",
  },
  {
    id: "p2",
    name: "Marketing Site",
    description: "New landing page and pricing.",
    color: "bg-emerald-500",
  },
  {
    id: "p3",
    name: "Mobile App",
    description: "React Native companion app.",
    color: "bg-amber-500",
  },
];

export const tasks: Task[] = [
  { id: "t1", projectId: "p1", title: "Design app shell layout", status: "done", priority: "high", assigneeId: "u1", dueDate: "2026-09-20" },
  { id: "t2", projectId: "p1", title: "Build Kanban board view", status: "in_progress", priority: "high", assigneeId: "u1", dueDate: "2026-09-28" },
  { id: "t3", projectId: "p1", title: "Wire up chat channel list", status: "in_progress", priority: "medium", assigneeId: "u2", dueDate: "2026-09-30" },
  { id: "t4", projectId: "p1", title: "Set up Postgres schema", status: "todo", priority: "high", assigneeId: "u3", dueDate: "2026-10-02" },
  { id: "t5", projectId: "p1", title: "Auth: email + magic link", status: "todo", priority: "medium", assigneeId: "u4", dueDate: null },
  { id: "t6", projectId: "p1", title: "Write onboarding checklist", status: "todo", priority: "low", assigneeId: "u2", dueDate: null },
  { id: "t7", projectId: "p2", title: "Draft homepage copy", status: "in_progress", priority: "medium", assigneeId: "u4", dueDate: "2026-09-27" },
  { id: "t8", projectId: "p2", title: "Pricing table component", status: "todo", priority: "medium", assigneeId: "u2", dueDate: null },
  { id: "t9", projectId: "p3", title: "Evaluate React Native vs Expo", status: "done", priority: "low", assigneeId: "u3", dueDate: "2026-09-18" },
];

export const channels: Channel[] = [
  { id: "c1", name: "general", isPrivate: false, unread: 0 },
  { id: "c2", name: "product", isPrivate: false, unread: 3 },
  { id: "c3", name: "random", isPrivate: false, unread: 0 },
  { id: "c4", name: "leadership", isPrivate: true, unread: 1 },
];

export const messages: Message[] = [
  { id: "m1", channelId: "c1", authorId: "u2", body: "Morning! Frontend shell is looking good.", time: "9:02 AM" },
  { id: "m2", channelId: "c1", authorId: "u3", body: "Nice, once the board view is in I can start wiring task data.", time: "9:05 AM" },
  { id: "m3", channelId: "c1", authorId: "u1", body: "Backend comes next — Postgres + auth first.", time: "9:07 AM" },
  { id: "m4", channelId: "c1", authorId: "u4", body: "Sounds good, I'll keep drafting copy in the meantime.", time: "9:10 AM" },
];

export function userById(id: string): User {
  return users.find((u) => u.id === id) ?? users[0];
}

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function tasksByProject(projectId: string): Task[] {
  return tasks.filter((t) => t.projectId === projectId);
}

export function messagesByChannel(channelId: string): Message[] {
  return messages.filter((m) => m.channelId === channelId);
}
