import mongoose from 'mongoose'
import dotenv from'dotenv'

dotenv.config();

const connectDB = async() => {
    (await mongoose.connect(process.env.mongo_uri).then(()=> console.log('Database is connected')))
}
export default connectDB;