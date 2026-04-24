import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { payloadJwt } from 'src/database/dtos/user-dtos';

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token não enviado');
    }

    try {
      const token = authHeader.split(' ')[1];

      const payload: payloadJwt = this.jwtService.verify(token, {
        secret: process.env.SECRET_JWT,
      });

      const permissions = payload.permisions || []

      let requiredPermission: string;

      switch (req.method) {
        case 'POST':
          requiredPermission = 'write';
          break;
        case 'GET':
          requiredPermission = 'read';
          break;
        case 'DELETE':
          requiredPermission = 'delete';
          break;
        case 'PUT':
          requiredPermission = 'update';
          break;
        default:
          throw new UnauthorizedException('Método não permitido');
      }

      if (!permissions.includes(requiredPermission)) {
        throw new UnauthorizedException(
          `Sem permissão (${requiredPermission})`
        );
      }

      next();
    } catch (err:unknown) {

      console.log(err)
      
      throw new UnauthorizedException('Token inválido');
    }
  }
}