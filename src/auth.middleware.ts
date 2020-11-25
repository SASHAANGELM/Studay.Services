import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import firebaseAdmin from './firebase/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    try {
      const result = await firebaseAdmin.auth().verifyIdToken(token);
      // @ts-ignore
      req.user = result;
    } catch (error) {
      // @ts-ignore
      req.user = null;
      console.log(error);
    }
    next();
  }
}
