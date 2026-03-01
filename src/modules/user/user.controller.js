import { Router } from "express";
import { signup, updateUser,findUserByEmail,getUserById} from "./user.service.js";
const router=Router()

router.post("/signup" , async (req,res,next)=>{
    const result  = await signup(req.body)
    return res.status(201).json({message:"User added successfully" , result})
})


router.put("/:id" , async (req,res,next)=>{
    const result  = await updateUser(req.body, req.params.id)
    return res.status(201).json({message:"User Created or Updated successfully" , result})
})



router.get("/by-email" , async (req,res,next)=>{
    const { email } = req.query;
    const user  = await findUserByEmail(email)
    return res.status(200).json({message:"User found successfully" , user})
})


router.get("/:id" , async (req,res,next)=>{
    const result  = await getUserById(req.params.id)
    return res.status(200).json({message:"User Found Successfully" , result})
})

export default router