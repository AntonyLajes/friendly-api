import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { refresh } from "./refresh";

export function ongsRoutes(app: FastifyInstance){

    app.post('/', create)
    app.post('/authenticate',authenticate)
    app.patch('/token/refresh', refresh)
    
}