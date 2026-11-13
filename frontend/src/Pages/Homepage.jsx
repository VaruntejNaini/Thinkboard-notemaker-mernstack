import {useState} from 'react';
import {useEffect} from 'react';
import NoteCard from '../Components/NoteCard.jsx';
import Navbar from '../Components/Navbar.jsx';
import RateLimitedUI from '../Components/RateLimitedUI.jsx';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import NotesNotFound from '../Components/NotesNotFound.jsx';

const Homepage = () => {
  const [ isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true) 
   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
       setNotes(res.data);
       setIsRateLimited(false);
        console.log(res.data);
      }catch (error) {
      console.error('Error fetching notes:', error);
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
      }else{
        toast.error("error to fetch notes");
      }}finally{
        setLoading(false);
      }
  }
    fetchNotes()}, []);  
      return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="mx-auto max-w-6xl py-8">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length == 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited &&(
          <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " >
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}               
          </div>
        ) }
      </div>
    </div>
  );
};

export default Homepage;