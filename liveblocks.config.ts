// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const PUBLIC_API_KEY = String(process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY);

if (!PUBLIC_API_KEY) {
  throw new Error("NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY is not set.");
}

type UserInfo = {
  name: string;
  color: string;
  picture: string;
}
export type UserAwareness = {
  user?: UserInfo;
};


export const client = createClient({
  publicApiKey: PUBLIC_API_KEY,
  // This is the default if you're using Clerk for authentication
  // authEndpoint: "/api/liveblocks/auth",
});

declare global {
  interface Liveblocks {
    UserMeta: {
      id: string; // Accessible through `user.id`
      info: UserInfo; // Accessible through `user.info`
    };
  }
}

export const {
  suspense: {
    useRoom, // <-- This resolves the useRoom error
    useSelf,
    useOthers,
    useStorage,
    useMutation,
    // Add other hooks you might need later
  },
} = createRoomContext(client);
