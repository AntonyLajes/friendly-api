import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { createLocationAndOng } from "./create-location-and-ong";
import request from "supertest"
import { app } from "@/app";

export async function authenticateOng(){

    const { body } = await request(app.server)
        .post('/ongs/authenticate')
        .send({
            email: 'email@email.com',
            password: '123456'
        })

    return {
        token: body.token
    }
}