import { Router } from "express";
import { createComments,updateComment,findOrCreateComment,searchComment } from "./comment.service.js";

const router = Router();


router.post('/',async (req,res,next)=>{
    const result  = await createComments(req.body.comments)
    return res.status(201).json({message:"Comments created successfully" , result})
})


router.patch('/:commentId',async (req,res,next)=>{
    const result  = await updateComment(req.params.commentId,req.body)
    return res.status(201).json({message:"Comment updated" , result})
})


router.post('/find-or-create',async (req,res,next)=>{
const result = await findOrCreateComment(req.body);
 return res.status(200).json({message:"Comment found or created" , result})
})


router.get('/search',async (req,res,next)=>{
const result = await searchComment(req.body);
 return res.status(200).json({message:"Comments found" , result})
})



export default router;


