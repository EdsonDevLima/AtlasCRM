import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICreateNotificationDto, IParamsSearchNotifications } from "src/database/dtos/notifications-dtos";
import { Notification } from "src/database/entities/notification";
import { Repository } from "typeorm";

@Injectable()
export class NotificationServices{
constructor(@InjectRepository(Notification) private readonly repository:Repository<Notification>){}


async create(dataNotification:ICreateNotificationDto){
    try{    
        
    const notification = new Notification()
    notification.message = dataNotification.message
    notification.type = dataNotification.type
    notification.saleId = dataNotification.saleId || null
    notification.userId = dataNotification.useId || null

    await this.repository.save(notification)
    return {sucess:true, message:`Notificação enviada com sucesso.`}

   } catch (error) {
    throw Error(error);
  }

}
async getByParams(dataNotification:IParamsSearchNotifications){
    try{    
        const {type,saleId,userId} = dataNotification

    const result = await this.repository.findBy({type,saleId,userId})
    return {sucess:true,items:result}

   } catch (error) {
    throw Error(error);
  }

}


}