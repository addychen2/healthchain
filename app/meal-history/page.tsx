import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import MealOverview from "@/components/MealOverview";
import CalorieCard from "@/components/CalorieCard";
import ProteinCard from "@/components/ProteinCard";


export default function Page(){

    return (

        <div className="grow flex flex-row ">
            <div className="flex">
                <SideNav/>
            </div>

            <div className=" grow flex-col justify-center h-screen inset-0 ">
                <MealOverview />
            </div>

            <div className="flex flex-col w-64 justify-evenly mx-10" >

            <CalorieCard />

           <ProteinCard />

        
        </div>
    </div>

    );
}