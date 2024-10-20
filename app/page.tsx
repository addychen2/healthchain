"use client"; // Add this line to indicate a Client Component

import { Nav } from "@/components/Nav";
import SideNav from "@/components/SideNav";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import CalorieCard from "@/components/CalorieCard";
import ProteinCard from "@/components/ProteinCard";
import HeaderAndChat from "@/components/HeaderAndChat";
import { useEffect, useState } from "react";

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getHumeAccessToken();
      if (!token) {
        throw new Error();
      }
      setAccessToken(token);
    };
    fetchAccessToken();
  }, []);

  if (!accessToken) {
    return <div>Loading...</div>; // Show loading state while fetching access token
  }

  return (
    <div className="grow flex flex-row h-screen">
      <div className="grow flex flex-col h-screen">
        <div className="hidden">
          <Nav />
        </div>
        <SideNav />
      </div>

      <HeaderAndChat accessToken={accessToken} />

      <div className="flex flex-col w-64 justify-evenly mx-10">
        <ProteinCard />
        <CalorieCard />
      </div>
    </div>
  );
}
