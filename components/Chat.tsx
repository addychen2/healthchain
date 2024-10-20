"use client";

import Messages from "./Messages";
import Controls from "./Controls";
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
    <div className="flex flex-col content-center mx-auto w-full h-full">
      <Messages ref={ref} />
      <Controls />
    </div>
  );
}
