import { generateRandomAlphanumeric } from "@/lib/util";
import { Button } from "@/components/button/Button";
import { Layout } from "@/components/layout/layout";
import { useState } from "react";

export default function Home() {
  const [roomName, setRoomName] = useState("");
  return (
    <Layout>
      <form
        className="flex left-0 top-0 w-full h-full bg-black/80 items-center justify-center text-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (typeof window === "undefined") {
            return;
          }
          const sanitizedRoomName = roomName.trim().toUpperCase().replace(/[^A-Z\d-]+/g, "-").replace(/^-+|-+$/g, '').replace(/--+/g, '-');
          const url = new URL(window.location.href);
          url.pathname = `${generateRandomAlphanumeric(4)}-${sanitizedRoomName}`;
          window.location.replace(url.toString());
        }}
      >
        <div className="flex flex-col gap-4 p-8 bg-gray-950 w-full max-w-[400px] rounded-lg text-white border border-gray-900">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl">Connect to demo room</h1>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <input
              className="text-white text-sm bg-transparent border border-gray-800 rounded-sm px-3 py-2"
              placeholder="ROOM-NAME"
              minLength={3}
              maxLength={12}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          </div>
          <Button accentColor="cyan" className="w-full" type="submit">
            Connect
          </Button>
        </div>
      </form>
    </Layout>
  );
}
