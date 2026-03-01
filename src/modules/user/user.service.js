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

export const updateUser   = async (inputs)=>{
  const {name,email,password,role,id} = inputs;
  const result = userModel.upsert(
   { id, name, email, password,role }, 
        { validate: false }
  );

  return result;
}

export const findUserByEmail   = async (email)=>{
  const found = await userModel.findOne({where:{email}})
 if(!found)
throw new Error('no user found')
  return found;
}

export const getUserById   = async (id)=>{
  const found = await userModel.findByPk(id,{
        attributes: { exclude: ['role'] } 
    })
 if(!found)
throw new Error('no user found')
  return found;
}