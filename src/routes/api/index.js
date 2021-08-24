import { Router } from 'express';
import authRoute from './authRoute';
import loanRoute from './loanRoute';
import walletRoute from './walletRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/loan', loanRoute);
router.use('/wallet', walletRoute);


export default router;
