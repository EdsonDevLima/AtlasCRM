import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import type { ICreateNotificationDto } from "src/database/dtos/notifications-dtos";
import { NotificationServices } from "./notifications.service";

@Controller("notification")
export class NotificationController{
    constructor(private readonly service:NotificationServices){}

@Post()
async create(@Body() body:ICreateNotificationDto){

    try{
     const result =  await this.service.create(body)
     return result
    }catch(error){
        throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

}