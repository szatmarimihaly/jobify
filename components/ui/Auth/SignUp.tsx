"use client"

import GlowLine from "../Design/GlowLine"
import { useState } from "react"
import Spinner from "@/components/ui/Design/Spinner"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        if(password.length < 8) {
            setError("Password must be at least 8 characters long")
            setLoading(false)
            return;
        }

        try{
            await signUp.email({
                email,
                password,
                name,
                callbackURL : "/dashboard"
            })
            router.push("/dashboard");
            router.refresh();
        }catch(error : any) {
            setError(error.message || "Failed to create account. Email may already exist.")
        }finally{
            setLoading(false)
        }


    }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto border-2 border-gray-200/10 rounded-2xl px-4 py-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent">Create your account</h1>

        {error && (
            <p className="bg-gray-800 text-gray-500 px-4 py-2 rounded-lg my-4 font-bold flex items-center gap-2">
                <CancelOutlinedIcon/>{error}
            </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-10">

            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200/10 rounded px-4 py-2 shadow-gray shadow-sm outline-none focus: bg-[#111] focus:border-white/20 focus:shadow-[0_0_0_1px_rgba(255, 255, 255, 0.08)]"
                placeholder="Username"
                required
            />

            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200/10 rounded px-4 py-2 shadow-gray shadow-sm outline-none focus: bg-[#111] focus:border-white/20 focus:shadow-[0_0_0_1px_rgba(255, 255, 255, 0.08)]"
                placeholder="Email"
                required
            />

            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200/10 rounded px-4 py-2 shadow-gray shadow-sm outline-none focus: bg-[#111] focus:border-white/20 focus:shadow-[0_0_0_1px_rgba(255, 255, 255, 0.08)]"
                placeholder="Password"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-gray-400/10 px-4 py-2 rounded-xl font-bold animation hover:scale-105 lg:w-60 mx-auto mt-10 hover:bg-gray-400/20"
            >
                {loading ? <Spinner/> : "Create account"}
            </button>

            <p className="text-gray-300 text-sm text-center">Already have an Account? <Link href={`/sign-in`} className="underline font-semibold">Sign In</Link> </p>

            <h3 className='bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent text-3xl font-bold'>Jobify</h3>
        </form>
    </div>
  )
}

export default SignUp