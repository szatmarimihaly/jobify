"use client"
import Spinner from "../Design/Spinner"
import { FormEvent, ReactEventHandler, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/auth-client"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Link from "next/link"
import GlowLine from "../Design/GlowLine"

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            await signIn.email({
                email,
                password,
                callbackURL : "/dashboard"
            })
            router.push("/dashboard");
            router.refresh();
        }catch(error : any) {
            setError(error.message || "Failed to login to your account")
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto border-2 border-gray-200/10 rounded-2xl px-4 py-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent">Login to your account</h1>
        {error && (
            <p className="bg-gray-800 text-gray-500 px-4 py-2 rounded-lg my-4 font-bold flex items-center gap-2">
                <CancelOutlinedIcon/>{error}
            </p>
        )}
        

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-10">
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
                {loading ? <Spinner/> : "Sign In"}
            </button>

            <p className="text-gray-300 text-sm text-center">Don't have an Account? <Link href={`/sign-up`} className="underline font-semibold">Create Account</Link> </p>

            <h3 className='bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent text-3xl font-bold'>Jobify</h3>
        </form>
    </div>
  )
}

export default SignIn