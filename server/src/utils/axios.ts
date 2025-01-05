import axios from 'axios';
import { JUDGE_API } from '../constants/env';

export const judgeApi = axios.create({
	baseURL: JUDGE_API,
});
