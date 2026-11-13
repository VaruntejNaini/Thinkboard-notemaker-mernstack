import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import {formatDate} from '../lib/utils.js';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

function NoteCard({ note , setNotes}) {
  const handleDelete = async (e,id) =>{
    e.preventDefault(); //gets rid of navigation
    if(!window.confirm("are you sure you want to delete this note"))return;
    try{
    await api.delete(`/notes/${id}`)
    setNotes((prev)=>prev.filter(note => note._id !== id)) //get rid of deleted notes 
    toast.success(`${id}Deleted successfully`)
    }catch(error){
      console.log("failed to delete the notes",error)
      toast.error("Failed to delet the notes")
    }
  }
  return (
    <Link
  to={`/notes/${note._id}`}
  className="card min-w-0 bg-base-100 hover:shadow-lg transition-all duration-200"
>
  <div className="card-body">
    <h3 className="card-title min-w-0 wrap-anywhere">{note.title}</h3>
    <p className="min-w-0 whitespace-pre-wrap wrap-anywhere">
      {note.content}
    </p>
         <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-1">
                <Pencil className="size-4"/>
                <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
                <Trash2 className="size-4"/>  
                </button>   
            </div>
         </div>
        </div>
    </Link>
    
  )
}

export default NoteCard