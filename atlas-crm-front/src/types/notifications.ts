export interface INotification{
    id:number
    type:"sale"|"refunded"|"support"|"warn product"
    userId:number
    saleId:number
    viewed:boolean
    message:string
    createdAt: Date;
}