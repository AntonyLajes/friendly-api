import fastify from "fastify"
import { petsRoutes } from "./http/controllers/pets/routes"
import { ZodError } from "zod"
import { env } from "./src"

export const app = fastify()

app.register(petsRoutes, {
    prefix: '/pets'
})

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        reply.status(400).send({
            message: 'Invalid Params',
            error: error.format()
        })
    }

    if(env.NODE_ENV === "dev"){
        console.log(error)
    }

    reply.status(500).send({
        message: 'Internal server error.'
    })
})