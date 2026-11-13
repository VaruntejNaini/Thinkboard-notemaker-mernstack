import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./configs/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();
const app = express();



 const PORT = process.env.PORT || 3000;

//middleware
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use(rateLimiter);

app.use((req,res,next)=>{
console.log(`request method is ${req.method} request url is ${req.path}`);

next();})

app.use("/api/notes",notesRoutes);
// app.get("/api/notes",(req,res)=>{
// res.status(200).send("DATA fetched successfully")
// })
// app.put("/api/notes",(req,res)=>{
// res.status(200).json({"message": "DATA updated successfully"})
// })
// app.post("/api/notes",(req,res)=>{
// res.status(201).json({"message": "DATA created successfully"})
// })
// app.delete("/api/notes",(req,res)=>{
// res.status(200).json({"message": "DATA deleted successfully"})
// })
await connectDB().then(()=>{
 app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`);
 })})