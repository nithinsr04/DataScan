import cloudinary from 'cloudinary'
import dotenv from 'dotenv'


dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret,
});

export default cloudinary.v2;

