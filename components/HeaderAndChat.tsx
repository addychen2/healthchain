"use client";

import { useState, useRef, ComponentRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StartCall from './StartCall';
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./Messages";
import { add_food_uid, get_all_food, remove_food_uid, set_limit, set_limit_protein } from '../app/API';

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: true,
});

function VoiceStateHandler({ onDisconnect }: { onDisconnect: () => void }) {
  const { status } = useVoice();

  useEffect(() => {
    if (status.value === 'disconnected') {
      onDisconnect();
    }
  }, [status.value, onDisconnect]);

  return null;
}

export default function HeaderAndChat({ accessToken }: { accessToken: string }) {
  const [chatInitiated, setChatInitiated] = useState(false);

  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];

  const handleChatInitiate = () => {
    setChatInitiated(true);
  };

  const handleDisconnect = () => {
    setChatInitiated(false);
  };

  return (
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
            const content = message.message.content; // Extract content
            if (content !== undefined) { // Check if content is defined
              if (content.includes("Adding") && content.includes("calories")) {
                add_food_uid(content);
                console.log("Food added to database");
              }
              if (content.includes("emoving") || content.includes("eleting")) {
                remove_food_uid(content);
                console.log("Food removed from database");
              }
              if (content.includes("etting") && content.includes("limit") && content.includes("calorie")) {
                set_limit(content);
                console.log("Limit set");
              }
              if (content.includes("etting") && content.includes("limit") && content.includes("protein")) {
                set_limit_protein(content);
                console.log("Limit set");
              }
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
      <div className="grow flex flex-col h-full inset-0">
        {!chatInitiated ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-6xl text-white font-sans text-center mb-8">
              Share Your Meals And We'll Track 'Em
            </h1>
            <StartCall onChatInitiate={handleChatInitiate} />
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto scrollbar-hide md:scrollbar-default snap-y snap-end">
            <VoiceStateHandler onDisconnect={handleDisconnect} />
            <Chat accessToken={accessToken} />
          </div>
        )}
      </div>
    </VoiceProvider>
  );
}
