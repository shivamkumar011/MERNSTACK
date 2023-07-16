
// import mongoose  from "mongoose";


// const URL='mongodb+srv://skmongo:9000@ecommerce.obvmk.mongodb.net/ECOMMERCE-APP?retryWrites=true&w=majority'


// const Connection = async()=>{
//     try{
//    await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
//    console.log('Database connected');
//     }catch(error){
//         console.log('Error:',error.message);
//     }
// }
// export default Connection;

import mongoose from 'mongoose';

const Connection = async (URL) => {
    
    
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true,useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;