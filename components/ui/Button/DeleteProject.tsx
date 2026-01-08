'use client';

import { deleteProject } from "@/lib/queries/actions/deleteProject";
import { startTransition, useTransition } from "react";
import DeleteSpinner from "../Design/SpinnerDelete";

interface DeleteProjectProps{
  projectId : string
}

export default function DeleteProject({ projectId } : DeleteProjectProps){

  const [isPending, setIsPending] = useTransition();

  return(
    <button 
      onClick={() => startTransition(() => deleteProject(projectId))}
      className="bg-red-400 text-red-900 px-4 py-2 rounded mt-10 shadow-[0_0_16px_rgba(255,100,103,0.4)]
      animation hover:scale-105"
      disabled={isPending}
    >
      {isPending ? <DeleteSpinner/> : "Delete Project"}
    </button>
  )
}