import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const mongoURI = process.env.MONGODB_URL

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully")
    })
}

export default connectToMongo;