import mongoose from 'mongoose';
//create schema
//create model based of that schema
const noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
     type:String,
     required:true,
    }
},
{ timestamps: true}//automatic createdat ,updatedat 
);
const Note = mongoose.model('Note',noteSchema);
export default Note;