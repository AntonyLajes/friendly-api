import { app } from "@/app";
import { authenticateOng } from "@/utils/test/authenticate-ong";
import { createLocationAndOng } from "@/utils/test/create-location-and-ong";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe('Refresh Token Controller', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to refresh token', async () => {

        const { ong } = await createLocationAndOng()
        

        const authResponse = await request(app.server)
            .post('/ongs/authenticate')
            .send({
                email: 'email@email.com',
                password: '123456'
            })

        const cookies = authResponse.get('Set-Cookie')
    
        if (!cookies) {
            throw new Error('No cookies found in the response')
        }

        const response = await request(app.server)
            .patch('/ongs/token/refresh')
            .set('Cookie', cookies)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.token).toEqual(
            expect.any(String)
        )
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })

})