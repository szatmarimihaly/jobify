"use client";
import Link from "next/link";
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';

const NavigateIcon = () => {
  return (
    <button className="w-full mx-auto bg-white mt-10 py-2 rounded">
        <ArrowOutwardOutlinedIcon sx={{ color:"black", fontWeight:"bold" }}/>
    </button>
  )
}

export default NavigateIcon