"use client"
import Link from "next/link"

type Props = {
    href : string,
    text : string
}

const NavigationGradientRounded = ({ href, text } : Props) => {
  return (
    <Link href={href} className="bg-gradient-to-r from-teal-500 to-blue-300 rounded-full text-black font-bold px-4 py-2">
        {text}
    </Link>
  )
}

export default NavigationGradientRounded