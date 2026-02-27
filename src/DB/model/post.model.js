import { DataTypes,Model } from "sequelize";
import { sequelize } from "../connection.db.js"
import { userModel } from "./index.js";


export class postModel extends Model {
}

postModel.init({
id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement:true,primaryKey:true,field:"P_id"},
title:{type:DataTypes.STRING(500),allowNull:false,field:"P_title"},
content:{type:DataTypes.STRING(5000),allowNull:false,field:"P_content"},
createdAt:{type:DataTypes.DATEONLY,field:'P_createdAt'},
deletedAt:{type:DataTypes.DATEONLY,field:'P_deletedAt'},
updatedAt:{type:DataTypes.DATEONLY,field:'P_updateddAt'}

},{
    sequelize:sequelize,
    tableName: 'Post',
    timestamps: true,       
    paranoid: true,          
})

postModel.belongsTo(userModel,{foreignKey:{
name:"P_userId"
},
onDelete:"CASCADE",
onUpdate:"CASCADE"
})

