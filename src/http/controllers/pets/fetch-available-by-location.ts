import { makeFetchAvailablePetsByLocationUseCase } from "@/use-cases/factories/make-fetch-avaliable-pets-by-location";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchAvailableByLocation(request: FastifyRequest, reply: FastifyReply){

    const fetchAvailableByLocationParamsSchema = z.object({
        locationId: z.string().uuid()
    })

    const fetchAvailableByLocationQuerySchema = z.object({
        color: z.string().nullable().default(null),
        breed: z.string().nullable().default(null),
    })

    const { locationId } = fetchAvailableByLocationParamsSchema.parse(request.params)
    const { color, breed } = fetchAvailableByLocationQuerySchema.parse(request.query)

    try {
        
        const fetchAvailablePetsByLocationUseCase = makeFetchAvailablePetsByLocationUseCase()

        const pets = await fetchAvailablePetsByLocationUseCase.handler({
            locationId,
            color,
            breed
        })

        return reply.send({
            pets   
        })
    } catch (error) {
        console.log(error)
        reply.status(409).send()
    }
}