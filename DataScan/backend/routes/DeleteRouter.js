import express from 'express';
import { deletePciScan, deletePhiScan, deletePiiScan } from '../controllers/DeleteController.js';

const DeleteRouter = express.Router();

DeleteRouter.delete('/phi/:id',deletePhiScan);
DeleteRouter.delete('/pci/:id',deletePciScan);
DeleteRouter.delete('/pii/:id',deletePiiScan);

export default DeleteRouter;