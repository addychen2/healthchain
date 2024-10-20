import SettingsOverview from "@/components/SettingOverview";
import SideNav from "@/components/SideNav";



export default function Page(){

    return (

        <div className="grow flex flex-row ">
      <div className="flex">
        <SideNav/>
      </div>

      <div className=" grow flex-col h-max inset-0 ">
        <SettingsOverview/>
        
       
      </div>
      
    </div>


    );
}