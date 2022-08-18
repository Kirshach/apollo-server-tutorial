import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

import { decodeAuthHeader } from './utils/auth';

interface Context {
  prisma: PrismaClient;
  userId?: number;
};

const prisma = new PrismaClient();

const context = ({ req }: { req: Request }): Context => {
  const token = req?.headers.authorization
    ? decodeAuthHeader(req.headers.authorization)
    : null;

  return {
    prisma,
    userId: token?.userId
  };
};

export { Context, context, prisma };
