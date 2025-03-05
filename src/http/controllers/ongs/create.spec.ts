import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { prisma } from "@/lib/prisma";

describe('Create Ong Controller', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create ong', async () => {

        const location = await prisma.location.create({
            data: {
                city: 'São Paulo',
                state: 'São Paulo'
            }
        })

        const response = await request(app.server)
            .post('/ongs')
            .send({
                name: 'Ong 1',
                address: 'Rua 1',
                phone_number: '12987654321',
                location_id: location.id,
                email: 'email@email.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(201)
        expect(response.body.ong).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        )
    })

})