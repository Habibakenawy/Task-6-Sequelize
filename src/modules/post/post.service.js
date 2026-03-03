import { postModel } from "../../DB/model/post.model.js";


export const createPost = async (body) => {
const {title,content,userId} = body;
const post = new postModel({title,content,P_userId:userId});
await post.save();
}