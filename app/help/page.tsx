import HelpWiki from "@/components/HelpWiki";
import SideNav from "@/components/SideNav";



export default function Page(){

    return (

        <div className="grow flex flex-row ">
      <div className="flex">
        <SideNav/>
      </div>

      <div className=" grow flex-col h-max inset-0 ">
        <HelpWiki/>
        
       
      </div>
      
    </div>


    );
}