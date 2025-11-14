import { Router } from 'express';
import auth from '../modules/auth/auth.routes.js';
import stats from '../modules/stats/stats.routes.js';

const r = Router();
r.use('/auth', auth);
r.use('/stats', stats);
export default r;
