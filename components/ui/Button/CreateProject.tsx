"use client";
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CreateProjectModal from '../Modal/CreateProjectModal';

const CreateProject = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    }

    const handleClose = () => {
      setIsOpen(false);
    }

  return (
    <>
        {!isOpen && (
          <button
            className='flex items-center gap-2 bg-[#1d1d1d] border border-gray-200/10 rounded px-4 py-2 animation hover:border-gray-200/20 shadow-[0_0_20px_rgba(229,231,235,0.1)] transition-all'
            onClick={handleOpen}
          >
            <AddOutlinedIcon fontSize='small'/>
            Create project
          </button>
        )}

        <CreateProjectModal isOpen={isOpen} onClose={handleClose}/>
    </>
  )
}

export default CreateProject