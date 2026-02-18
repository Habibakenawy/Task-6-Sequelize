import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../../config/config.service.js"
import  { Sequelize } from  'sequelize';

export const  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port:DB_PORT,
  dialect: "mysql"
});


export const authenticateDB = async () =>{

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter:true,force: false,match:/_test$/ }); //alter 3lshan lw 8yrt 7aga fel code //force 3lshan lw hw23 el table w abneeh mn awl w gdeed //match 3lshan a match bs ll db elly a5r esmha test using regex 
  console.log('All models were synchronized successfully.');
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}