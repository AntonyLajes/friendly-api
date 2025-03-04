import { OngsRepository } from "@/repositories/ongs-repository";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryOngsRepository } from "@/repositories/in-memory/in-memory-ongs-repository";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let ongsRepository: OngsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

    beforeEach(async () => {
        ongsRepository = new InMemoryOngsRepository()
        sut = new AuthenticateUseCase(ongsRepository)
    })

    it('should be able to authenticate', async () => {
        await ongsRepository.create({
            name: 'Ong 1',
            address: 'Rua 1',
            phone_number: '12987654321',
            location_id: 'ad389d12-50c2-4045-aa2d-3c4df48e4282',
            email: 'email@email.com',
            password: await hash('123456', 6)
        })

        const authenticatedUser = await sut.handler({
            email: 'email@email.com',
            password: '123456'
        })

        expect(authenticatedUser).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        )
    })

    it('should not be able to authenticate with unexistent user', async () => {
        await expect( 
            sut.handler({
                email: 'email@email.com',
                password: '123456'
            }) 
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await ongsRepository.create({
            name: 'Ong 1',
            address: 'Rua 1',
            phone_number: '12987654321',
            location_id: 'ad389d12-50c2-4045-aa2d-3c4df48e4282',
            email: 'email@email.com',
            password: await hash('123456', 6)
        })
        
        await expect( 
            sut.handler({
                email: 'email@email.com',
                password: '654321'
            }) 
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})