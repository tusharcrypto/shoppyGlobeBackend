import express from  "express"
import mongoose from "mongoose"
import { routes } from "./Routes/shoppy.routes.js";

const app = express();
app.use(express.json());

app.listen(4000,()=>{
  console.log("Server listening on port 4000");
})
// connet to database;
mongoose.connect("mongodb://localhost:27017/ShoppyGlobe");
const db = mongoose.connection;
db.on("open",()=>{
  console.log("Database connection successfull");
})
db.on("error",()=>{
  console.log("Database connection failed")
})
routes(app)