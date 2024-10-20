import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import Login from "@/components/Login";


export default function Page(){

    return (

        <div className="grow flex flex-row ">
            <div className="flex">
                <SideNav/>
            </div>

            <div className=" grow flex-col justify-center h-screen inset-0 ">
                <Login />
            </div>

    </div>

    );
}