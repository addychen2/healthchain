import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";




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

      <div className=" grow flex-col h-max inset-0 ">
        
        <Chat accessToken={accessToken}/>
        
      </div>

      <div className="flex flex-col w-64 justify-evenly mx-10" >

        <Card

          goalTitle="Protein Goal"
          currentValue={80}
          goalValue={100}
          status="Below"
        
        />

        <Card

          goalTitle="Calorie Goal"
          currentValue={3000}
          goalValue={2800}
          status="Above"
        
        />

        
      </div>

  
          

      
    </div>
  );
}
