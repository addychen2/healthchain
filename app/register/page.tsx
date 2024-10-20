import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import Register from "@/components/Register";


export default function Page(){

    return (

        <div className="grow flex flex-row justify-center content-center">
           

            <div className=" grow flex-col justify-center content-center h-screen inset-0 ">
                <Register />
            </div>

    </div>

    );
}