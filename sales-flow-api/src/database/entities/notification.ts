import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Notification{
    
    @Column()
    type:"sale"|"refunded"|"support"|"warn product"
    @Column()
    userId:number | null
    @Column()
    saleId:number | null
    @Column()
    viewed:boolean
    @Column()
    message:string
    @CreateDateColumn()
    createdAt: Date;


}