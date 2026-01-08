import GlowLine from '@/components/ui/Design/GlowLine'
import ProjectDisplay from '@/components/ui/Display/ProjectDisplay'
import ProjectNav from '@/components/ui/Navbar/ProjectNav'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getUserProjects } from '@/lib/queries/cached/getUserProjects'

const Page = async () => {

    const user = await getCurrentUser();

    const userProjects = await getUserProjects(user!.id);

  return (
    <>
        <header>
            <ProjectNav/>
        </header>

        <main className='flex flex-col items-center'>
            <h1 className='text-5xl lg:text-6xl mt-10 text-center'>Application projects</h1>
            <GlowLine/>
            
            <ProjectDisplay projects={userProjects}/>
        </main>
    </>
  )
}

export default Page