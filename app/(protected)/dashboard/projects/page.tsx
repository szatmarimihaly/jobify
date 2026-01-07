import GlowLine from '@/components/ui/Design/GlowLine'
import ProjectDisplay from '@/components/ui/Display/ProjectDisplay'
import ProjectNav from '@/components/ui/Navbar/ProjectNav'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, desc } from 'drizzle-orm'

const Page = async () => {

    const user = await getCurrentUser();

    const userProjects = await db.query.projects.findMany({
        where: eq(projects.userId, user!.id),
        orderBy: [desc(projects.createdAt)]
    })

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