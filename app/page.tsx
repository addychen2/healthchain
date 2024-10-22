import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const CalorieCard = dynamic(() => import('@/components/CalorieCard'), { ssr: false });
const ProteinCard = dynamic(() => import('@/components/ProteinCard'), { ssr: false });
const HeaderAndChat = dynamic(() => import('@/components/HeaderAndChat'), { ssr: false });
const SideNav = dynamic(() => import('@/components/SideNav'), { ssr: false });


export default async function Page() {

  const accessToken = await getHumeAccessToken();
  
  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className="grow flex flex-row h-screen">
      <div className="grow flex flex-col h-screen">
        <div className="hidden">
        </div>
        <SideNav/>
      </div>

      <HeaderAndChat accessToken={accessToken} />

      <div className="flex flex-col w-64 justify-evenly mx-10">
        <ProteinCard />
        <CalorieCard />
      </div>
    </div>
  );
}
