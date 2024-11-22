import express from 'express'
import {getPiiData,getPciData,getPhiData} from '../controllers/ScansController.js'

const ScansRouter = express.Router();

ScansRouter.get('/pci',getPciData);
ScansRouter.get('/phi',getPhiData);
ScansRouter.get('/pii',getPiiData);

export default ScansRouter;