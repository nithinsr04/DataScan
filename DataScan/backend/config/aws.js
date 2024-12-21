
import AWS from 'aws-sdk';
import dotenv from 'dotenv'; 



AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
});



const Textract = new AWS.Textract();

export default Textract
