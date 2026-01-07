"use client";
import Link from 'next/link';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

const CreateProjectNav = () => {

  return (
    <>
        <Link
            className='flex items-center gap-2 bg-[#1d1d1d] border border-gray-200/10 rounded px-4 py-2 animation hover:border-gray-200/20 shadow-[0_0_20px_rgba(229,231,235,0.1)]'
            href={"/dashboard/projects/create-project"}
        >
            <AddOutlinedIcon fontSize='small'/>Create project
        </Link>
    </>
  )
}

export default CreateProjectNav