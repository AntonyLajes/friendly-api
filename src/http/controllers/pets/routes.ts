import { FastifyInstance } from "fastify";
import { create } from "./create";
import { fetchAvailableByLocation } from "./fetch-available-by-location";
import { findById } from "./find-by-id";
import { verifyJwt } from "@/http/middlewares/verifyJwt";

export async function petsRoutes(app: FastifyInstance){

    app.addHook('onRequest', verifyJwt)

    app.post('/', create)
    app.get('/location/:locationId', fetchAvailableByLocation)
    app.get('/:id', findById)
}