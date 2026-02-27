import { DataTypes,Model } from "sequelize";
import { sequelize } from "../connection.db.js"
import { userModel ,postModel} from "./index.js";


export class commentModel extends Model {
}

commentModel.init({
id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement:true,primaryKey:true,field:"C_id"},
content:{type:DataTypes.TEXT,allowNull:false,field:"C_content"},
createdAt:{type:DataTypes.DATEONLY,field:'C_createdAt'},
deletedAt:{type:DataTypes.DATEONLY,field:'C_deletedAt'},
updatedAt:{type:DataTypes.DATEONLY,field:'C_updatedAt'}

},{
    sequelize:sequelize,
    tableName: 'Comment',
    timestamps: true,               
})

commentModel.belongsTo(postModel,{foreignKey:{
name:"C_postId"
},
onDelete:"CASCADE",
onUpdate:"CASCADE"
})

commentModel.belongsTo(userModel,{foreignKey:{
name:"C_userId"
},
onDelete:"CASCADE",
onUpdate:"CASCADE"
})
