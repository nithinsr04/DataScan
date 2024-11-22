
import AWS from 'aws-sdk';
import fs from 'fs';

const credentialsPath = './config/aws-credentials.json';


const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

AWS.config.update({
  accessKeyId: credentials.accessKeyId,
  secretAccessKey: credentials.secretAccessKey,
  region: credentials.region
});



const Textract = new AWS.Textract();

export default Textract