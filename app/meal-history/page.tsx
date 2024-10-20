import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import MealOverview from "@/components/MealOverview";


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