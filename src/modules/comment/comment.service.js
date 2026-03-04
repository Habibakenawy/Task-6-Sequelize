import { commentModel } from "../../DB/model/comment.model.js";
import { Op } from "sequelize";


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





export const findOrCreateComment = async (body) => {
   const { postId, userId, content } = body;

   const [comment, created] = await commentModel.findOrCreate({
      where: {
         C_userId: userId,
         C_postId: postId
      },
      defaults: {
         content,
         C_userId: userId,
         C_postId: postId
      }
   });

   return { comment, created };
};




export const searchComment = async (body) => {
   const { word } = body;
   const foundComments = await commentModel.findAndCountAll({
        where: {
            content: { [Op.like]: `%${word}%` }
        }
    });
    if(foundComments.count==0) throw new Error('No comments found')
    return foundComments
};



export const getNewestComments = async (postId) => {
   const foundComments = await commentModel.findAll({
        where: {
          C_postId: postId
        },
        limit:3,
        order: [['C_createdAt', 'DESC']]
    });
    return foundComments
};


