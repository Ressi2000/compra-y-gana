import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
console.log(uri)

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Ressi2000:RFAS2CmNyimPQcV1@cluster0.dniygm0.mongodb.net/app_sorteos_cca?retryWrites=true&w=majority')
        console.log(">>> DB conectado!")
    } catch (error) {
        console.log(error);
    }
};
