import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){

    const createPetBodySchema = z.object({
        name: z.string(),
        birthdate: z.string().datetime(),
        locationId: z.string().uuid()
    })

    const { name, birthdate, locationId } = createPetBodySchema.parse(request.body)

    try {
        const createPetUseCase = makeCreatePetUseCase()
        const pet = await createPetUseCase.handler({
            name,
            birthdate,
            locationId
        })

        reply.status(201).send(pet)
    } catch (error) {
        console.log(error)
        reply.status(409).send()
    }
}