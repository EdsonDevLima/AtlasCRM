import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductDto } from 'src/database/dtos/products-dtos';
import { Product } from 'src/database/entities/product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repository: Repository<Product>) { }
    async createProduct(product: Product) {
        try {
            await this.repository.save(product)
        } catch (error) {
            throw Error(error)
        }


    }
    async removeProduct(id: number) {
        try {
            const product = await this.repository.findOne({ where: { id } });

            if (!product) {
            throw new NotFoundException("Produto não encontrado");
            }

            await this.repository.remove(product);

            return { sucess: true, message: "Produto removido" };

        } catch (error: unknown) {

            let message = "";

            if (error instanceof Error) {
                message = error.message;
            }

            if (
                message.includes("foreign key constraint fails") ||
                message.includes("Cannot delete or update a parent row")
            ) {
                throw new BadRequestException(
                "Não é possível excluir o produto, pois ele está vinculado a outros registros."
                );
            }

            throw error;
            }
        }
    async updateProduct(product: IProductDto) {
        try {
            const productExist = await this.repository.findOne({ where: { id: product.id } })
            if (productExist) {
                await this.repository.update({ id: productExist.id }, {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    status:product.status,
                    amount:product.amount,
                    isPromotion:product.isPromotion,
                    category:product.category

                })
                return { sucess: true, message: "Produto atualizado" }
            } else {
                return { sucess: false, message: "Produto não encontrado" }
            }

        } catch (error) {
            throw Error(error)
        }
    }
    async getAllProducts() {
        try {
            const items = await this.repository.find()
            return { items }

        } catch (error) {
            throw Error(error)
        }
    }
    async getProduct(id: number) {
        try {
            const product = await this.repository.findOne({ where: { id } })
            return product
        } catch (error) {
            throw Error(error)
        }
    }
}
