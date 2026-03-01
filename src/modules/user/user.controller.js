import { Router } from "express";
import { signup, updateUser} from "./user.service.js";
const router=Router()

router.post("/signup" , async (req,res,next)=>{
    const result  = await signup(req.body)
    return res.status(201).json({message:"User added successfully" , result})
})


router.put("/:id" , async (req,res,next)=>{
    const result  = await updateUser(req.body, req.params.id)
    return res.status(201).json({message:"User Created or Updated successfully" , result})
})
export default router