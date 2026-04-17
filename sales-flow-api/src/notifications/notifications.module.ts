import { Module } from "@nestjs/common";
import { NotificationController } from "./notifications.controller";
import { NotificationServices } from "./notifications.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "src/database/entities/notification";



@Module({
    imports:[TypeOrmModule.forFeature([Notification])],
    controllers:[NotificationController],
    providers:[NotificationServices],
    exports:[]
})
export class NotificationModule{}