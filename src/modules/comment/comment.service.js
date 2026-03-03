import { commentModel } from "../../DB/model/comment.model.js";


export const createComments = async (body) => {

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