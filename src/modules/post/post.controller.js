import {Router} from "express"
import { createPost ,deletePost} from "./post.service.js";

const router = Router();


router.post('/',async (req,res,next)=>{
    const result  = await createPost(req.body)
    return res.status(201).json({message:"Post created successfully" , result})
}) 

router.delete('/:postId',async (req,res,next)=>{
    const result  = await deletePost(req.params.postId,req.body)
    return res.status(200).json({message:"Post Deleted successfully" , result})
}) 










export default router;