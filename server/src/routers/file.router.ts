import express from 'express';
import {
	createFile,
	handleFileExecution,
} from '../controllers/file.controllers';

const router = express.Router();

router.post('/execute', handleFileExecution);

router.post('/', createFile);

export default router;
