import express from 'express'
import upload from '../middleware/multer.js';
import AnalyseImage from '../controllers/AnalyseController.js';

const AnalyseRouter = express.Router();

AnalyseRouter.post('/image',upload.single("file"),AnalyseImage);

export default AnalyseRouter;