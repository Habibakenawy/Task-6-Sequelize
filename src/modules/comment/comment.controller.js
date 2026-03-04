import { Router } from "express";
import { createComments,updateComment } from "./comment.service.js";

const router = Router();


router.post('/',async (req,res,next)=>{
    const result  = await createComments(req.body.comments)
    return res.status(201).json({message:"Comments created successfully" , result})
})


router.patch('/:commentId',async (req,res,next)=>{
    const result  = await updateComment(req.params.commentId,req.body)
    return res.status(201).json({message:"Comment updated" , result})
})

export default router;


