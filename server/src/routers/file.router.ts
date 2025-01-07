import express from 'express';
import {
	createFile,
	handleFileExecution,
} from '../controllers/file.controllers';
import { OK } from '../constants/http';
import { authenticate } from '../middleware/authentication';

const router = express.Router();

router.post('/execute', authenticate, handleFileExecution);
router.post('/', authenticate, createFile);
router.get('/test', (req, res) => {
	res.status(OK).json({ message: 'Success' });
});

export default router;
