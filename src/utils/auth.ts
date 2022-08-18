import * as jwt from 'jsonwebtoken';

// be sure to have this as an .env in real life!
export const APP_SECRET = 'LalAlA_GraPHqL_S3Cr3t';

export interface AuthTokenPayload {
  userId: number;
};

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');
  if (!token) throw new Error('No token found');
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
};
