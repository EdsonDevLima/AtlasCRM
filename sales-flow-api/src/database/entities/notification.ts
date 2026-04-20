import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    type:"sale"|"refunded"|"support"|"warn product"
    @Column({nullable:true})
    userId:number
    @Column({nullable:true})
    saleId:number
    @Column()
    viewed:boolean
    @Column()
    message:string
    @CreateDateColumn()
    createdAt: Date;


}