export interface IProductDto {
    id?: number
    name: string
    price: string
    description: string
    amount:number
    category:string
    isPromotion:boolean
    status:string
    image?: string
}
export interface ICreateProductUpload {
  name: string;
  price: string;
  description: string;
}
