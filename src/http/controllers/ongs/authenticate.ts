import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        
        const authenticateUseCase = makeAuthenticateUseCase()
        const ong = await authenticateUseCase.handler({
            email,
            password
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: ong.id
            }
        })

        reply.send({
            token
        })

    } catch (error) {
        if (error instanceof InvalidCredentialsError){
            reply.status(401).send({
                message: error.message
            })
        }

        throw error
    }
}