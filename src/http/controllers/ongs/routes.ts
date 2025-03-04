import { FastifyInstance } from "fastify";
import { create } from "./create";

export function ongsRoutes(app: FastifyInstance){

    app.post('/', create)

}