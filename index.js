import dotenv from 'dotenv';
dotenv.config();

import { connectToDB } from './src/config/db.js';
import app from './src/app.js';

connectToDB().then(()=>{
    console.log("Databse connected successfully !")
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch(e=>{
    console.error(e);
})