import SignOut from "@/components/ui/Auth/SignOut"
import DashboardCard from "@/components/ui/Card/DashboardCard"
import AuthNav from "@/components/ui/Navbar/AuthNav"


const Page = () => {
  return (
    <>
    
      <header>
        <AuthNav/>
      </header>

      <main>
        <DashboardCard/>
      </main>

    </>
  )
}

export default Page