import { Router } from 'express';
import { statistic } from '../../controllers/statistic.controller';
import extractToken from '../../middleWares/checkUserWithToken';

const router = Router();
router.get('/', extractToken, statistic);
