"use client";

import Link from 'next/link';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const BackButton = () => {
  return (
    <Link
        href={"/"}
        className='bg-[#111] border border-gray-200/10 rounded px-2 py-2 animation hover:bg-linear-to-r from-teal-500 to-blue-300'
    >
        <ArrowBackIosOutlinedIcon fontSize='small'/>
    </Link>
  )
}

export default BackButton