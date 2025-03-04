import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeFindByIdUseCase } from "@/use-cases/factories/make-find-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findById(request: FastifyRequest, reply: FastifyReply){

    const findByIdParamSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = findByIdParamSchema.parse(request.params)

    try {
        const findByIdUseCase = makeFindByIdUseCase()
        
        const pet = await findByIdUseCase.handler(id)

        return reply.send({
            pet
        })
    } catch (error) {
        if(error instanceof ResourceNotFoundError){
            reply.status(404).send({
                message: error.message
            })
        }

        throw error
    }

} 