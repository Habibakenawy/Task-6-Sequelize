import { DataTypes } from "sequelize"
import { sequelize } from "../connection.db.js"

export const users =[]





export const userModel = sequelize.define(
"User",
{
    id:{
     type:DataTypes.INTEGER,
     allowNull:false,
     primaryKey:true,
     autoIncrement:true,
     field:"u_id"
    },
    name:{
    type:DataTypes.STRING(200),
    allowNull:false,
    field:"u_name"
    },
    email:{
    type:DataTypes.STRING(200),
    allowNull:false,
    unique:true,
    field:"u_email" ,
    validate:{
          isEmail:{msg:"Email must be valid and formatted as lol@example.dummy "}
    }
    },
    password:{
    type:DataTypes.STRING(200),
    allowNull:false,
    field:"u_password", 
    validate:{
        checkPasswordLength(pass){
          if(pass.length<6)
            throw new Error("Password length must be greater than 6 characters.")
        }
    }
    },
    role:{
        type:DataTypes.ENUM("user","admin"),
        allowNull:false,
        field:"u_role" 
    },
    u_CreatedAt: {
        type: DataTypes.DATEONLY,
        field: "u_CreatedAt",
        defaultValue: DataTypes.NOW
    },
    u_UpdatedAt: {
        type: DataTypes.DATEONLY,
        field: "u_UpdatedAt"
    }
},{
        hooks: {
            beforeCreate: (user, options) => {
                if ( user.name.length <= 2) {
                    throw new Error("checkNameLength: Name must be greater than 2 characters.");
                }
            },
        },
    createdAt: "u_CreatedAt", 
    updatedAt: "u_UpdatedAt",
    timestamps: true
    }
)