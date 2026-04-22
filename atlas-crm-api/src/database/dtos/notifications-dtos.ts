export interface ICreateNotificationDto{
    message:string,
    type:"sale"|"refunded"|"support"|"warn product",
    saleId?:number,
    userId:number
}

export interface IParamsSearchNotifications{
    type:"sale" | "refunded" | "support" | "warn product",
    saleId?:number
    userId?:number
}