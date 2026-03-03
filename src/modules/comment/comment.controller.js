import { Router } from "express";
import { createComments } from "./comment.service.js";

const router = Router();


router.post('/',async (req,res,next)=>{
    const result  = await createComments(req.body.comments)
    return res.status(201).json({message:"Comments created successfully" , result})
})

export default router;
