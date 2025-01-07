import express from 'express';
import {
	createFile,
	handleFileExecution,
} from '../controllers/file.controllers';
import { OK } from '../constants/http';

const router = express.Router();

router.post('/execute', handleFileExecution);
router.post('/', createFile);
router.get('/test', (req, res) => {
	res.status(OK).json({ message: 'Success' });
});

export default router;
