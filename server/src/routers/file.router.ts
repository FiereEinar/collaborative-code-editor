import express from 'express';
import { handleFileExecution } from '../controllers/fileController';

const router = express.Router();

router.post('/', handleFileExecution);

export default router;
