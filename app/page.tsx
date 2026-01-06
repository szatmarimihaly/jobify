import BorderButton from "@/components/ui/Button/BorderButton";
import NavigationGradient from "@/components/ui/Button/NavigationGradient";
import GlowLine from "@/components/ui/Design/GlowLine";
import HomeNav from "@/components/ui/Navbar/HomeNav";

export default function Home() {
  return (
    <>
    
      <header>
        <HomeNav/>
      </header>

      <main className="flex flex-col items-center mx-2">
      <h1 className="flex leading-tight text-3xl gap-2 lg:text-7xl font-bold mt-20">Welcome to <span className="bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent">Jobify.ai</span></h1>
      <GlowLine/>
      <p className="text-gray-500 text-sm text-center">The best way to prepare for job interviews and analize your cv to make your application more efficient.</p>

      <div className="w-full flex flex-col md:flex-row items-center gap-4 justify-center mt-10">
        <BorderButton text="Request a demo" href="/demo"/>
        <NavigationGradient text="Create account" href="/sign-up"/>
      </div>
    </main>
    </>
  );
}
