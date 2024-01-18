import WidgetBot from "@widgetbot/react-embed";
import { getDiscord } from "config";
import { useRef } from "react";
import toast from "react-hot-toast";

function Discord() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <>
      <WidgetBot
        server={getDiscord()?.server}
        channel={getDiscord()?.channel}
        className="h-full w-full"
        height={windowSize.current[1] - 64 - 28 - 28 - 28}
        onAPI={(client) => {
          client.on("message", (data) => {
            console.log(data.message.content, data.channel.name);
            toast.success(
              "New Message in " +
                data.channel.name +
                " , " +
                data.message.content
            );
          });
        }}
      />
    </>
  );
}

function DiscordPage() {
  return (
    <>
      <Discord />
    </>
  );
}

export { Discord, DiscordPage };
