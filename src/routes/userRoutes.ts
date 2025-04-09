import express, { Request, Response, NextFunction } from 'express';
import {
    updateUserData,
    fetchUserData,
    createUser,
    loginUser,
    errorHandler, fetchAllUsers
} from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';
import { AuthenticatedRequest } from '../types/express';

const router = express.Router();

const asyncHandler = <T extends Request>(
    fn: (req: T, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req as T, res, next).catch(next);
    };
};

router.post('/create', asyncHandler(createUser));
router.post('/login', asyncHandler(loginUser));

router.put('/update', authMiddleware, asyncHandler<AuthenticatedRequest>(updateUserData));
router.get('/me', authMiddleware, asyncHandler<AuthenticatedRequest>(fetchUserData));
router.get('/all', authMiddleware, asyncHandler<AuthenticatedRequest>(fetchAllUsers));


router.use(errorHandler);

export default router;