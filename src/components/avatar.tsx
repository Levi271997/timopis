import type { User } from "@/lib/mock-data";

const SIZES = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
} as const;

export function Avatar({
  user,
  size = "md",
}: {
  user: User;
  size?: keyof typeof SIZES;
}) {
  return (
    <span
      title={user.name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white ${user.color} ${SIZES[size]}`}
    >
      {user.initials}
    </span>
  );
}
