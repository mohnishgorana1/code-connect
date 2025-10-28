"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export default function LiveblocksMeetingProvider({
  children,
  meetingId,
}: {
  children: React.ReactNode;
  meetingId: string;
}) {
  const roomId = `stream-collab-${meetingId}`;
  return (
    <LiveblocksProvider
      publicApiKey={String(process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY)}
    >
      <RoomProvider id={roomId} initialPresence={{}} initialStorage={{}}>
        <ClientSideSuspense
          fallback={
            <div className="text-white text-lg p-4">
              Loading collaborative editor...
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
