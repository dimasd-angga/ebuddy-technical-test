import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token or invalid format');
    return res.status(403).json({ error: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Check if it's a custom token by looking at its structure
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    if (decoded.uid) {
      // It's likely a custom token with uid directly embedded
      (req as Request & { user?: any }).user = { uid: decoded.uid };
      next();
    } else {
      // Try to verify as ID token
      const decodedToken: DecodedIdToken = await admin.auth().verifyIdToken(token);
      (req as Request & { user?: DecodedIdToken }).user = decodedToken;
      next();
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
