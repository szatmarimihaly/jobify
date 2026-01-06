import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

type Props = {
    children ?: React.ReactNode
}

export default async function AuthLayout({ children } : Props){
    const session = await auth.api.getSession({
        headers : await headers()
    })

    if(!session) {
        redirect('/sign-in')
    }

    return(
        <>
            <main>
                {children}
            </main>
        </>
    )
}

