import { notFound } from "next/navigation";
import { ChatView } from "@/components/chat-view";
import { channels } from "@/lib/mock-data";

export default async function ChatChannelPage({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) {
  const { channelId } = await params;
  const channel = channels.find((c) => c.id === channelId);
  if (!channel) notFound();

  return <ChatView channel={channel} />;
}
