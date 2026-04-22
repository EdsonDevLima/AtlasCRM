import { Module } from "@nestjs/common";
import { NotificationController } from "./notifications.controller";
import { NotificationServices } from "./notifications.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "src/database/entities/notification";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports:[TypeOrmModule.forFeature([Notification])],
    controllers:[NotificationController],
    providers:[NotificationServices,JwtService],
    exports:[]
})
export class NotificationModule{}