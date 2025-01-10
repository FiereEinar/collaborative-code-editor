import express from 'express';
import {
	createFileHandler,
	getUserFiles,
	handleFileExecution,
} from '../controllers/file.controllers';
import { authenticate } from '../middleware/authentication';

const router = express.Router();

router.post('/execute', authenticate, handleFileExecution);
router.post('/', authenticate, createFileHandler);
router.get('/', authenticate, getUserFiles);

export default router;
