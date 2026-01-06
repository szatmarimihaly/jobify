import Link from 'next/link'
import React from 'react'

type Props = {
    href : string,
    text : string
}

const BorderButton = ({ href, text } : Props) => {
  return (
    <Link
      href={href}
      className="inline-block rounded-xl bg-linear-to-r from-teal-500 to-blue-400 p-[2px]"
    >
      <span className="block rounded-xl bg-black px-6 py-3 text-sm text-white font-bold">
        {text}
      </span>
    </Link>
  )
}

export default BorderButton