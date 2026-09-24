import { Avatar } from "@/components/avatar";
import { messagesByChannel, userById, type Channel } from "@/lib/mock-data";

export function ChatView({ channel }: { channel: Channel }) {
  const channelMessages = messagesByChannel(channel.id);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-200 px-6 py-4">
        <h1 className="text-sm font-semibold text-neutral-900">
          {channel.isPrivate ? "🔒" : "#"} {channel.name}
        </h1>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
        {channelMessages.length === 0 && (
          <p className="text-sm text-neutral-400">
            No messages yet in this channel.
          </p>
        )}
        {channelMessages.map((message) => {
          const author = userById(message.authorId);
          return (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar user={author} />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-neutral-900">
                    {author.name}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {message.time}
                  </span>
                </div>
                <p className="text-sm text-neutral-700">{message.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-neutral-200 px-6 py-4">
        <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2">
          <input
            type="text"
            placeholder={`Message #${channel.name}`}
            className="flex-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            disabled
          />
          <button
            type="button"
            disabled
            className="rounded-md bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500"
          >
            Send
          </button>
        </div>
        <p className="mt-1 text-[11px] text-neutral-400">
          Sending is disabled until the chat backend is wired up.
        </p>
      </div>
    </div>
  );
}
