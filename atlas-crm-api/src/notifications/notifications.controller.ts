import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import type { ICreateNotificationDto, IParamsSearchNotifications } from "src/database/dtos/notifications-dtos";
import { NotificationServices } from "./notifications.service";

@Controller("notification")
export class NotificationController {
  constructor(private readonly service: NotificationServices) {}

  @Post()
  async create(@Body() body: ICreateNotificationDto) {
    try {
      const result = await this.service.create(body);
      return result;
    } catch (error) {
      throw new HttpException(
        error || "Erro ao criar notificação",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getAll(@Query() query: IParamsSearchNotifications,@Headers("token") token: string) {
    try {
      const result = await this.service.getByParams(query,token);
      return result;
    } catch (error) {
      throw new HttpException(
        error || "Erro ao buscar notificações",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}