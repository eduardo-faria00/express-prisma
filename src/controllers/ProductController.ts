import { Request, Response } from "express"
import { prismaClient } from "../database/prismaClient";

export default {
    async createProduct(request: Request, response: Response) {
        const { name, price, category_id } = request.body

        const category = await prismaClient.category.findUnique({
            where: {
                id: category_id
            }
        })

        if (!category){
            return response.json({ msg: 'Categoria não econtrada' })
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                category_id: category.id
            },
            include: {
                ProductCategory: true
            }
        })
        return response.json(product)
    },

    async findProduct(request: Request, response: Response) {
        const { id } = request.params

        const product = await prismaClient.product.findFirst({
            where: {
                id
            },
            // inclui o nome da categoria desse produto
            include: {
                ProductCategory: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return response.json(product)
    },

    async findAllProducts(request: Request, response: Response) {
        const products = await prismaClient.product.findMany()

        return response.json(products)
    },

    async updateProduct(request: Request, response: Response) {
        const { id } = request.params
        const { name, price } = request.body

        const product = await prismaClient.product.update({
            where: {
                id
            },
            data: {
                name,
                price
            }
        })

        return response.json(product)
    },

    async deleteProduct(request: Request, response: Response) {
        const { id } = request.params

        await prismaClient.product.delete({
            where: {
                id
            }
        })
        return response.json({ msg: 'Produto excluído' })
    }
}

