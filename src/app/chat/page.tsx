import { redirect } from "next/navigation";
import { channels } from "@/lib/mock-data";

export default function ChatPage() {
  redirect(`/chat/${channels[0].id}`);
}
