import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import authRoute from "./routes/auth.js"
import profileRoute from "./routes/profile.js"
import chatRoute from './routes/ChatRoute.js'
import messageRoute from './routes/MessageRoute.js'
import multer from "multer";
import path from 'path'
import {fileURLToPath} from 'url';
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/profile',profileRoute);
app.use('/api/chat',chatRoute);
app.use('/api/message',messageRoute);
app.use("/images", express.static(path.join(__dirname, 'images')));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, "images");
    },
    filename: (req,file,cb)=>{
      cb(null,req.body.name);
    }
  });
  
  const upload = multer({storage:storage});
  app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File has been uploaded");
  });
  
app.listen(PORT , (req,res)=>{
    console.log("Backend is running on port 5000");
})