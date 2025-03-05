import { app } from "@/app";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "@/use-cases/create-pet";
import { createLocationAndOng } from "@/utils/test/create-location-and-ong";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { authenticateOng } from "@/utils/test/authenticate-ong";

describe('Create Pet Controller', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a new pet', async () => {

        const { ong } = await createLocationAndOng()
        const { token } = await authenticateOng()

        const response = await request(app.server)
            .post('/pets')
            .set(
                'Authorization',
                `Bearer ${token}`
            )
            .send({
                name: 'Scooby',
                birthdate: '2025-02-17T00:00:00.000Z',
                locationId: ong.location_id,
                ongId: ong.id,
                color: 'brown',
                breed: 'mixed'
            })

        expect(response.statusCode).toEqual(201)
        expect(response.body.pet).toEqual(
            expect.objectContaining({
                location_id: ong.location_id
            })
        )
    })

})