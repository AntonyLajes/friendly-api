import { FastifyInstance } from "fastify";
import { create } from "./create";
import { fetchAvailableByLocation } from "./fetch-available-by-location";

export async function petsRoutes(app: FastifyInstance){

    app.post('/', create)
    app.get('/find/location/:locationId', fetchAvailableByLocation)

}