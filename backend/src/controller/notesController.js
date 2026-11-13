import Note from "../models/Note.js";
export async function getallNotes(req,res){

    try{
    const notes = await Note.find(); 
    res.status(200).json(notes);}catch(error){
    res.status(500).json({message: "error fetching notes"})
}
}
export async function getNotesById(req,res){
 try{
  const notebyid = await Note.findById(req.params.id);
  if(!notebyid){return res.status(404).json({message:"note not found"})}
res.status(200).json(notebyid); 
}catch(error){
    res.status(500).json({message:"error getting the notes by ID",error})
 }
}
export async function createNotes(req,res){
    try{
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        await newNote.save();
        res.status(201).json({message:"New message created successfully"});
    }catch(error){
       res.status(500).json({message: "error creating note",error})
}
}

export async function updateNotes(req,res){
    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    }catch(error){
        res.status(500).json({message: "error updating note",error})
    }
}

export async function deleteNotes(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
    }catch(error){
        res.status(500).json({message: "error deleting the  note",error})
    }
}
