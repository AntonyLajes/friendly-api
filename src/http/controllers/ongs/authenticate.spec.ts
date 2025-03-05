import { app } from "@/app";
import { createLocationAndOng } from "@/utils/test/create-location-and-ong";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Authenticate Ong Controller', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate an ong', async () => {

        const { ong } = await createLocationAndOng()

        const response = await request(app.server)
            .post('/ongs/authenticate')
            .send({
                email: ong.email,
                password: '123456'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                token: expect.any(String)
            })
        )
    })

})