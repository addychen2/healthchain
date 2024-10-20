import SideNav from "@/components/SideNav";
import Card from "@/components/ui/Card";
import MealOverview from "@/components/MealOverview";
import CalorieCard from "@/components/CalorieCard";
import ProteinCard from "@/components/ProteinCard";
import CalorieGraphCard from "@/components/ui/CalorieGraph";
import ProteinGraphCard from "@/components/ui/ProteinGraph";


export default function Page() {
    return (
        <div className="grow flex flex-row" style={{ overflow: 'hidden' }}>
            <div className="flex">
                <SideNav />
            </div>

            <div className="grow flex-col justify-center h-screen inset-0 overflow-hidden">
                <MealOverview />
            </div>

            <div className="flex flex-col w-128 justify-evenly mx-10 overflow-hidden">
                <CalorieGraphCard />

                <ProteinGraphCard />

            </div>

            <div className="flex flex-col w-128 justify-evenly mx-10 overflow-hidden">
                <ProteinCard />
                <CalorieCard />
            </div>
        </div>
    );
}