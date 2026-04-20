import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ICreateNotificationDto,
  IParamsSearchNotifications,
} from "src/database/dtos/notifications-dtos";
import { payloadJwt } from "src/database/dtos/user-dtos";
import { Notification } from "src/database/entities/notification";
import { Repository } from "typeorm";
import { In } from "typeorm";

@Injectable()
export class NotificationServices {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
    private jwtService: JwtService
  ) {}

  async create(data: ICreateNotificationDto) {
    try {
      const notification = this.repository.create({
        message: data.message,
        type: data.type,
        saleId: data.saleId || 0,
        userId: data.userId || 0, 
      });

      await this.repository.save(notification);

      return {
        success: true,
        message: "Notificação enviada com sucesso.",
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error || "Erro ao salvar notificação"
      );
    }
  }

  async getByParams(params: IParamsSearchNotifications,token:string) {
    try {
      const { saleId } = params;
      const payload:payloadJwt = this.jwtService.verify(token,{secret:process.env.SECRET_JWT})
      
     const result = await this.repository.find({
  where: {
    type:
      payload.role === "admin"
        ? In(["refunded", "support", "warn product"])
        : "sale",

    ...(saleId && { saleId }),
    ...(payload.role !== "admin" && { userId: payload.sub }),
  },
  order: {
    createdAt: "DESC",
    },
        });

      return {
        success: true,
        items: result,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error || "Erro ao buscar notificações"
      );
    }
  }
}