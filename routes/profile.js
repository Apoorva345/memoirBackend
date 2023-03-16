import express from "express";
import User from "../models/Post.js";
const router = express.Router();

router.get("/:id", async(req,res)=>{
    try{

         const user = await User.find({username: req.body});
         console.log(user);
         console.log(req.params.id);
         if(user)
           res.status(200).json(user);
        else
          res.status(404).json("No such user")
    }catch(err)
    {
        res.status(500).json(err);
    }
})

export default router