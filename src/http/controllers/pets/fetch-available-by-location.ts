import { makeFetchAvailablePetsByLocationUseCase } from "@/use-cases/factories/make-fetch-avaliable-pets-by-location";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchAvailableByLocation(request: FastifyRequest, reply: FastifyReply){

    const fetchAvailableByLocationParamsSchema = z.object({
        locationId: z.string().uuid()
    })

    const { locationId } = fetchAvailableByLocationParamsSchema.parse(request.params)

    try {
        
        const fetchAvailablePetsByLocationUseCase = makeFetchAvailablePetsByLocationUseCase()

        const pets = await fetchAvailablePetsByLocationUseCase.handler({
            locationId
        })

        return reply.send({
            pets   
        })
    } catch (error) {
        reply.status(409).send()
    }
}