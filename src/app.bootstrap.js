
import { NODE_ENV, port } from '../config/config.service.js'
import {  userRouter } from './modules/index.js'
import { authenticateDB } from "./DB/connection.db.js";
import express from 'express'

async function bootstrap()  {
    const app = express()
    //convert buffer data
    app.use(express.json())
      //DB
    await authenticateDB()
    //application routing
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/users', userRouter)


    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //error-handling
    app.use((err, req, res, next) => {
    const status = err?.cause?.status ?? 500;
    return res.status(status).json({err,message:err.message||"something went wrong", stack:err.stack}); //stack makan el error
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap