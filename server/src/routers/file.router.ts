import express from 'express';
import {
	createFileHandler,
	getUserFilesHandler,
	fileExecutionHandler,
} from '../controllers/file.controllers';
import { authenticate } from '../middleware/authentication';

const router = express.Router();

router.post('/execute', authenticate, fileExecutionHandler);
router.post('/', authenticate, createFileHandler);
router.get('/', authenticate, getUserFilesHandler);

export default router;
