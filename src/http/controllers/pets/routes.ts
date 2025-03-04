import { FastifyInstance } from "fastify";
import { create } from "./create";
import { fetchAvailableByLocation } from "./fetch-available-by-location";
import { findById } from "./find-by-id";

export async function petsRoutes(app: FastifyInstance){

    app.post('/', create)
    app.get('/find/location/:locationId', fetchAvailableByLocation)
    app.get('/:id', findById)
}