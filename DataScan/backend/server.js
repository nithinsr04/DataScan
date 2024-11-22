import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import AnalyseRouter from './routes/AnalyseRouter.js';
import ScansRouter from './routes/ScansRouter.js';
import DeleteRouter from './routes/DeleteRouter.js';

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

//checking working of server
app.get('/',(req,res)=>{
    res.send('Hello World');
})


// app.use('/api/upload',UploadRouter);
app.use('/api/analyse',AnalyseRouter);
app.use('/api/scans',ScansRouter);
app.use('/api/delete',DeleteRouter);



//Initiating server
app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
});