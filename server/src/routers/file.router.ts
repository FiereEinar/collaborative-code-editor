import express from 'express';
import {
	createFile,
	getUserFiles,
	handleFileExecution,
} from '../controllers/file.controllers';
import { authenticate } from '../middleware/authentication';

const router = express.Router();

router.post('/execute', authenticate, handleFileExecution);
router.post('/', authenticate, createFile);
router.get('/', getUserFiles);

export default router;
