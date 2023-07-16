import express from 'express';
// import bodyParser from 'body-parser';
 import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

import Connection from './database/db.js';
import DefaultData from './default.js';

import  mongoose  from 'mongoose';
// import cors from 'cors'
import router from './routes/route.js';
import bodyParser from 'body-parser';
import path from 'path';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import crypto from 'crypto';
// const express = require("express");
// const path = require("path");
// const Razorpay = require("razorpay");
// const shortid = require("shortid");
// const bodyParser = require("body-parser");
// const crypto = require("crypto");
// const cors = require("cors");
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { paymentusingRazorpay, verifyPayment } from './controller/payment-controller.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/',router);
// console.log(process.env.RAZORPAY_KEY_ID)
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/verification", verifyPayment);

app.post("/razorpay", paymentusingRazorpay);

const PORT = process.env.PORT||8000 ;

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce.obvmk.mongodb.net/ECOMMERCE-APP?retryWrites=true&w=majority`;
console.log(URL)

Connection(URL);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});



DefaultData();


// const app=express();
// const PORT =8000;



 // include before other routes








// const connection = async(username,password)=>{
//     const URL=`mongodb+srv://${username}:${password}@ecommerce.obvmk.mongodb.net/ECOMMERCE-APP?retryWrites=true&w=majority`
//     try{
//    await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
//    console.log('Database connected');
//     }catch(error){
//         console.log('Error:',error.message);
//     }
// }



// app.listen(PORT ,()=>console.log(`server is running on ${PORT}`))




