import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_CONNECT_URI);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDb connection established')
        })
        connection.on('error', () => {
            console.log('MongoDb connection failed')
        })
    }
    catch (err) {
        console.log('something went wrong please check your mongodb connection')
        console.log('error')
    }
}