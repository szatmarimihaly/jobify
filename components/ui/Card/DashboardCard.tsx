
import Link from "next/link"
import { DASHBOARD_CARDS } from "@/lib/data/dashboard-cards"
import NavigateIcon from "../Button/NavigateIcon"


const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full max-w-5xl mx-auto">
        {DASHBOARD_CARDS.map((card) => (
                <Link
                    key={card.id}
                    href={card.href}
                    className="bg-[#111] hover:bg-[#1d1d1d] border border-gray-200/10 rounded p-6 animation hover:border-gray-200/20 shadow-[0_0_20px_rgba(229,231,235,0.1)]"
                >
                    <h3 className="text-center mb-10 font-bold text-2xl lg:text-4xl">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                    <NavigateIcon/>
                </Link>
        ))}
    </div>
  )
}

export default DashboardCard