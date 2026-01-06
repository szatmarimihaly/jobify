"use client"
import Link from "next/link"

type Props = {
    href : string,
    text : string
}

const NavigationGradient = ({ href, text } : Props) => {
  return (
    <Link href={href} className="bg-linear-to-r from-teal-500 to-blue-300 rounded-md text-black font-bold px-4 py-2">
        {text}
    </Link>
  )
}

export default NavigationGradient