import { DataSourceOptions } from "typeorm";
import { Product } from "../entities/product";
import { Sale } from "../entities/sale";
import { User } from "../entities/user";
import { Notification } from "../entities/notification";

export const conn: DataSourceOptions = {
    type: "mysql",
    url:process.env.DATABASE_URL,
    synchronize: true,
    entities: [Product,Sale,User,Notification]
}