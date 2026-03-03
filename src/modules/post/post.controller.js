import {Router} from "express"
import { createPost } from "./post.service.js";

const router = Router();


router.post('/',async (req,res,next)=>{
    const result  = await createPost(req.body)
    return res.status(201).json({message:"Post created successfully" , result})
}) 













export default router;