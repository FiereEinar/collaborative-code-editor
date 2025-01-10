import express from 'express';
import {
	authCheckHandler,
	loginHandler,
	signupHandler,
} from '../controllers/auth.controllers';

const router = express.Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/token/check', authCheckHandler);

export default router;
