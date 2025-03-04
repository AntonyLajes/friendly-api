import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export function ongsRoutes(app: FastifyInstance){

    app.post('/authenticate',authenticate)

    /* Protected Routes */
    app.post('/', {
        onRequest: [verifyJwt]
    }, create)

}