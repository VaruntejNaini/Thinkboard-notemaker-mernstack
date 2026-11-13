import React from 'react'
import Homepage from './Pages/Homepage.jsx'
import  CreatePage from './Pages/CreatePage.jsx'
import  NoteDetails from './Pages/NoteDetails.jsx'
import {Routes, Route} from 'react-router'
import toast from 'react-hot-toast'


const App = () => {
  return (
    <div>
      
      <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/notes/:id" element={<NoteDetails/>}/>
    </Routes>
    </div>

  )
}

export default App