import { makeCreateOngUseCase } from "@/use-cases/factories/make-create-ong";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){

    const createOngsBodySchema = z.object({
        name: z.string(),
        address: z.string(),
        phone_number: z.string(),
        location_id: z.string().uuid(),
        email: z.string().email(),
        password: z.string()
    })

    const { name, address, phone_number, location_id, email, password} = createOngsBodySchema.parse(request.body)

    try {
        const createOngUseCase = makeCreateOngUseCase()

        const ong = await createOngUseCase.handler({
            name, 
            address, 
            phone_number, 
            location_id, 
            email, 
            password
        })

        reply.status(201).send({
            ong: {
                ...ong,
                password: undefined
            }
        })
    } catch (error) {
        throw error
    }

}