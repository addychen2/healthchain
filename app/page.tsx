
import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import CalorieCard from "@/components/CalorieCard";
import ProteinCard from "@/components/ProteinCard";



const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: true,
});



export default async function Page() {
  const accessToken = await getHumeAccessToken();

  {

    
  }
  
  if (!accessToken) {
    throw new Error();
  }

  return (
    
    <div className="grow flex flex-row ">
      <div className="flex">
        <SideNav/>
      </div>

      <div className=" grow flex-col  h-max inset-0">
        <h1 className="text-7xl text-white font-sans text-center content-end h-96  ">
          Share Your Meals And We'll Track 'Em
        </h1>
        
          

        <Chat accessToken={accessToken} />
        
        
      </div>

      <div className="flex flex-col w-64 justify-evenly mx-10" >

        <ProteinCard />

        <CalorieCard />


        
      </div>

  
          

      
    </div>
  );
}
