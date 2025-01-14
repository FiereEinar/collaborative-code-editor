import express from 'express';
import {
	authCheckHandler,
	loginHandler,
	refreshHandler,
	signupHandler,
} from '../controllers/auth.controllers';

const router = express.Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/refresh', refreshHandler);
router.get('/token/check', authCheckHandler);

export default router;
