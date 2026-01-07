import { signOutAction } from "@/actions/sign-out"

const SignOut = () => {
    return(
        <button
            onClick={signOutAction}
            className="bg-linear-to-r from-teal-500 to-blue-300 rounded-full text-black font-bold px-4 py-2"
        >
            Sign Out
        </button>
    )
}

export default SignOut