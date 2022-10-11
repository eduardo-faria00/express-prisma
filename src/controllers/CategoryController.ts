import { Request, Response } from "express"
import { prismaClient } from "../database/prismaClient";

export default {
    async createCategory(request: Request, response: Response) {
        const { name } = request.body

        try {
            const category = await prismaClient.category.findFirst({
                where: { name }
            })

            if (category) {
                return response.json({ msg: 'Essa categoria já existe' })
            }

            await prismaClient.category.create({
                data: {
                    name
                }
            })

            return response.json(category)
        }
        catch (error) {
            return response.json(error)
        }
    },

    async findCategory(request: Request, response: Response) {
        const { id } = request.params

        try {
            const category = await prismaClient.category.findFirst({
                where: {
                    id
                }
            })

            if (!category) return response.json({ msg: 'Categoria não encontrada' })

            return response.json(category)
        } catch (error) {
            return response.json(error)
        }

    },

    async findAllCategories(request: Request, response: Response) {

        const categories = await prismaClient.category.findMany()

        if (!categories) return response.json({ msg: 'Nenhuma categoria encontrada' })

        return response.json(categories)
    },

    async updateCategory(request: Request, response: Response) {
        const { id } = request.params
        const { name } = request.body

        try {
            const category = await prismaClient.category.findUnique({
                where: {
                    id
                }
            })

            if (!category) {
                return response.json({ msg: 'Categoria não encontrada' })
            }

            await prismaClient.category.update({
                where: {
                    id
                },
                data: {
                    name
                }
            })

            return response.json(category)

        } catch (error) {
            response.json(error)
        }

    },

    async deleteCategory(request: Request, response: Response) {
        const { id } = request.params

        const category = await prismaClient.category.findUnique({
            where:{
                id
            }
        })

        if(!category){
            return response.json({msg: 'Categoria não encontrada'})
        }

        await prismaClient.category.delete({
            where: {
                id
            }
        })
        return response.json({ msg: 'Categoria excluida' })
    }
}