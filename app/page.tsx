import { Nav } from "@/components/Nav";
import SideNav from "@/components/SideNav";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import CalorieCard from "@/components/CalorieCard";
import ProteinCard from "@/components/ProteinCard";
import HeaderAndChat from "@/components/HeaderAndChat";

export default async function Page() {
  const accessToken = await getHumeAccessToken();
  
  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className="grow flex flex-row h-screen">
      <div className="grow flex flex-col h-screen">
        <div className="hidden">
          <Nav/>
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
