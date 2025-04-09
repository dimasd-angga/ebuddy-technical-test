import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repository/userCollection';
import * as admin from 'firebase-admin';
import { AuthenticatedRequest } from '../types/express';
import { authClient } from '../config/firebaseClient';

const userRepository = new UserRepository();

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userData = req.body;

        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const existingUser = await userRepository.findUserByEmail(userData.email);
        if (existingUser) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }

        const newUser = await userRepository.createUser(userData);

        const { password, ...userResponse } = newUser;

        res.status(201).json(userResponse);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        try {
            const userCredential = await authClient.signInWithEmailAndPassword(email, password);
            const idToken = await userCredential.user?.getIdToken();

            const userRecord = await admin.auth().getUserByEmail(email);
            const userData = await userRepository.fetchUser(userRecord.uid);

            res.status(200).json({
                token: idToken,
                user: userData,
            });

        } catch (authError) {
            console.error('Login failed:', authError);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        next(error);
    }
};


export const updateUserData = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user.uid;
        const userData = req.body;

        const updatedUser = await userRepository.updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const fetchUserData = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user.uid;

        const user = await userRepository.fetchUser(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);
    res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
    });
};

export const fetchAllUsers = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userRepository = new UserRepository();

        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const pageSize = req.query.limit ? parseInt(req.query.limit as string) : 10;

        if (page < 1 || pageSize < 1 || pageSize > 100) {
            res.status(400).json({
                error: 'Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 100.'
            });
            return;
        }

        const { users, pagination } = await userRepository.fetchAllUsers(page, pageSize);

        const totalPages = Math.ceil(pagination.totalCount / pageSize);

        res.status(200).json({
            users,
            pagination: {
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize,
                totalItems: pagination.totalCount,
                totalPages,
                hasNextPage: pagination.hasMore,
                hasPrevPage: page > 1,
                nextPage: pagination.hasMore ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null
            }
        });
    } catch (error) {
        next(error);
    }
};