import {userModel} from '../../DB/model/index.js'
export const signup   = async (inputs)=>{
  const {name,email,password,role} = inputs;
  const checkIfEmailExists = await userModel.findOne({where:{email}})
  if(checkIfEmailExists){
    throw new Error("Email already exists");
  }
  const result = userModel.build({
    name,
   email,
    password,
   role
  });

  await result.save();
  return result;
}