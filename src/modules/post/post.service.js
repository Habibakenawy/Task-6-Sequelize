import { postModel } from "../../DB/model/post.model.js";
import { userModel } from "../../DB/model/user.model.js";
import { commentModel } from "../../DB/model/comment.model.js";

export const createPost = async (body) => {
  const { title, content, userId } = body;
  const post = new postModel({ title, content, P_userId: userId });
  await post.save();
};

export const deletePost = async (postID, body) => {
  const { userID } = body;

  const post = await postModel.findByPk(postID);

  if (!post) throw new Error("Post not found");

  if (Number(userID) !== Number(post.P_userId)) {
    throw new Error("You are not authorized to delete this post");
  }
  const deletePost = await post.destroy();
  return deletePost;
};


export const getAllPosts = async () => {
    return await postModel.findAll({
        attributes: ['id', 'title'], 
        include: [
            {
                model: userModel, attributes: ['id', 'name'] 
            },
            {
                model: commentModel ,
                as:'comments',
                attributes: ['id', 'content'] 
            }
        ]
    });
};