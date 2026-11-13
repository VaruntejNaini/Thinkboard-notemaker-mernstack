import { ArrowBigLeftDashIcon } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';
import { Link ,useNavigate } from 'react-router';
import api from '../lib/axios';


const CreatePage = () => {
  const [ Title, SetTitle] = React.useState('');
  const [Content, SetContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!Title.trim() || !Content.trim()){
      toast.error('Title and Content are required');
      return;
  }

  setIsLoading(true);
  try {
    await api.post("/notes", {
      title: Title,
      content: Content
    })
    toast.success("note created succesfully")
    navigate("/");
  } catch (error) {
    console.log("error creating notes", error)
    if (error.response.status === 429) {
      toast.error("Slowdown! your creating notes too fast!")
      duration: 4000;
    } else {
      toast.error("note creation failed")
    }
    console.log("failed creating..")
  } finally {
    setIsLoading(false);
  }

}  
    return <div className="min-h-screen bg-base-200 max-w-2xl mx-auto">
   <div className="container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
      <Link to = "/" className="btn btn-ghost">
        <ArrowBigLeftDashIcon className="w-5 h-5" /> Back to Notes
      </Link>
    </div>
    <div className="card bg-base-100 ">
      <div className="card-body"> 
        <h2 className="card-title text-2xl mb-4">Create Note</h2>
      <form onSubmit={handleSubmit}>
       <div className="form-control mb-4">
         <label className="label">
           <span className="label-text">Title</span>
         </label>
         <input
           type="text"
           placeholder="NoteTitle"
           className="input input-bordered w-full"
           value={Title}
           onChange={(e) => SetTitle(e.target.value)}
         />
       </div>
       <div className="form-control">
         
         <label className="label">
           <span className="label-text">Content</span>
         </label>
         
         <textarea
           placeholder="Write your notes here..."
           className="textarea textarea-bordered w-full"
           value={Content}
           onChange={(e) => SetContent(e.target.value)}
         />
       </div>
       <div className="card-actions justify-end">
         <button type="submit" className="btn btn-primary" disabled={isLoading}>
         {isLoading ? 'Creating...' : 'Create Note'}
       </button>
       </div>
      
      </form>
      </div>
    

    </div>
   </div>
    </div>
}

export default CreatePage