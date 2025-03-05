import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { authenticateOng } from "@/utils/test/authenticate-ong";
import { createLocationAndOng } from "@/utils/test/create-location-and-ong";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Fetch Available Pets by Location Controller', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch pet by location', async () => {
        
        const { location, ong } = await createLocationAndOng()
        const { token } = await authenticateOng()

        await prisma.pet.create({
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
            .get(`/pets/location/${location.id}?color=brown&breed=mixed`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.pets).toEqual([
            expect.objectContaining({
                id: expect.any(String),
                name: 'Scooby',
                location_id: ong.location_id,
                ong_id: ong.id,
            })
        ])

    })

})