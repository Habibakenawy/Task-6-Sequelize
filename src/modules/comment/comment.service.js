import { commentModel } from "../../DB/model/comment.model.js";


export const createComments = async (body) => { //should check the fact that the comments can be created for a post that does not exist

   const mappedBody = body.map(comment => ({
      content: comment.content,
      C_postId: comment.postId,   
      C_userId: comment.userId    
   }));

   const comments = await commentModel.bulkCreate(mappedBody, {
      fields: ['content','C_postId','C_userId']
   });

   return comments;
};


export const updateComment = async (commentId,inputs) =>{
 const { userId ,content} = inputs;


  const comment = await commentModel.findByPk(commentId);

  if (!comment) throw new Error("Comment not found");

  if (Number(userId) !== Number(comment.C_userId)) {
    throw new Error("You are not authorized to update this comment");
  }
  const updatedComment = await comment.update({ content: content });
  return updatedComment;
}