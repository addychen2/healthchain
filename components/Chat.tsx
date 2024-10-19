import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";
import SideNav from "./SideNav";
import { add_food } from "../app/API";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  
  
  return (

    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={(message) => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);

          console.log(message.type)

          if (message.type === "assistant_message") {
            // Log the expressions inferred
            console.log(message)
            // Add the food to the database
            add_food(message);
            console.log(message.models.prosody?.scores)
          }
        }}
      >
        
        <Messages ref={ref} />
        <Controls />
        <StartCall />
          
      </VoiceProvider>
    </div>
    
  );
}
