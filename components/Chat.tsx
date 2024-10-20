"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";
import { add_food, get_all_food, add_food_uid, remove_food_uid, set_limit, set_limit_protein } from '../app/API';

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
        "flex  flex-col content-center mx-auto w-full h-128  "
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

          if(message.type === "assistant_message") {
            console.log(message.message.content)
            if (message.message.content.includes("Adding") && message.message.content.includes("calories")) {
              add_food_uid(message.message.content);
              console.log("Food added to database")
            }
            if (message.message.content.includes("emoving") ||  message.message.content.includes("eleting")) {
              remove_food_uid(message.message.content);
              console.log("Food removed from database")
            }
            if(message.message.content.includes("etting") && message.message.content.includes("limit") && message.message.content.includes("calorie")) {
              set_limit(message.message.content);
              console.log("Limit set");
            }
            if(message.message.content.includes("etting") && message.message.content.includes("limit") && message.message.content.includes("protein")) {
              set_limit_protein(message.message.content);
              console.log("Limit set");
            }

          }

          get_all_food()

          if (message.type === "user_message") {
            // Log the expressions inferred
            console.log(message.message.content)
            // Add the food to the database
            
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
