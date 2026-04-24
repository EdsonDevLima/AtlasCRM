
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const apiKey = req.headers['api-key'];

    if (apiKey !== process.env.SERVER_API_KEY) {
    throw new UnauthorizedException('API Key inválida');
    }


    next();
  }
}
