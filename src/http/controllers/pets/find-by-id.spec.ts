import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { authenticateOng } from "@/utils/test/authenticate-ong";
import { createLocationAndOng } from "@/utils/test/create-location-and-ong";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Find Pet by Id Controller', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to find pet by id', async () => {

        const { location, ong } = await createLocationAndOng()
        const { token } = await authenticateOng()

        const pet = await prisma.pet.create({
            data: {
                name: 'Scooby',
                birthdate: '2025-02-17T00:00:00.000Z',
                location_id: ong.location_id,
                ong_id: ong.id,
                color: 'brown',
                breed: 'mixed'
            }
        })

        const response = await request(app.server)
            .get(`/pets/${pet.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.pet).toEqual(
            expect.objectContaining({
                name: 'Scooby',
                birthdate: '2025-02-17T00:00:00.000Z',
                location_id: ong.location_id,
                ong_id: ong.id,
                color: 'brown',
                breed: 'mixed'
            })
        )

    })

})