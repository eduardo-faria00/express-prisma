import {Request, Response} from 'express'
import { prismaClient } from '../database/prismaClient'

export class CreateProductWithCategory{
    async handle(request: Request, response: Response){
        const {name, price, id_category} = request.body

        const product = await prismaClient.productCategory.create({
            data:{
                product:{
                    create:{
                        name,
                        price
                    }
                },
                category: {
                    connect:{
                        id: id_category
                    }
                }
            }
        })

        return response.json(product)
    }
}