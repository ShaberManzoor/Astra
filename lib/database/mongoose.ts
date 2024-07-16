'use server'
import mongoose from 'mongoose';

let isConnected=false

export const connectToDB=async()=>{
    if(isConnected){
        console.log("Mongo is already connected")
        return
    }

    try{
        await mongoose.connect(process.env.MONGO_URI!)

        isConnected=true
        console.log("connected to mongodb")
    }
    catch(e){
        console.log(e)
    }
}

// import mongoose from "mongoose";

// const connection: { isConnected?: number } = {};
// export const connectToDB = async () => {
//   try {
//     if (connection.isConnected) {
//       console.log("Using existing connection");
//       return;
//     }
//     const mongoURL = process.env.NEXT_PUBLIC_MONGO_URI;
//     if (!mongoURL) throw new Error("No Mongo URL specified ");
//     const db = await mongoose.connect(mongoURL);
//     connection.isConnected = db.connections[0].readyState;
//     console.log("Connected To DB");
//   } catch (err) {
//     console.log(err);
//     throw new Error("Error connecting to db");
//   }
// };