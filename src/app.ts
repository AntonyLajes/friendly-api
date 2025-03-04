import fastify from "fastify"
import { petsRoutes } from "./http/controllers/pets/routes"
import { ZodError } from "zod"
import { env } from "./env"
import { ongsRoutes } from "./http/controllers/ongs/routes"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"

export const app = fastify()


app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(petsRoutes, {
    prefix: '/pets'
})

app.register(ongsRoutes, {
    prefix: '/ongs'
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