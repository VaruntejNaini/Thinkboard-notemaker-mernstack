import express from "express";
import {getallNotes,updateNotes,createNotes,deleteNotes,getNotesById} from "../controller/notesController.js";
 const route = express.Router();
 
 
 route.get("/",getallNotes)
 route.get("/:id",getNotesById)
 route.put("/:id",updateNotes)
 route.post("/",createNotes)
 route.delete("/:id",deleteNotes)
 
export default route;