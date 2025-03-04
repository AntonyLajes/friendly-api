import { OngsRepository } from "@/repositories/ongs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOngUseCase } from "./create-ong";
import { InMemoryOngsRepository } from "@/repositories/in-memory/in-memory-ongs-repository";

let ongsRepository: OngsRepository
let sut: CreateOngUseCase

describe('Create Ong Use Case', () => {

    beforeEach(() => {
        ongsRepository = new InMemoryOngsRepository()
        sut = new CreateOngUseCase(ongsRepository)
    })

    it('should be able to create ong', async () => {
        const ong = await sut.handler({
            name: 'Ong 1',
            address: 'Rua 1',
            phone_number: '12987654321',
            location_id: 'ad389d12-50c2-4045-aa2d-3c4df48e4282',
            email: 'email@email.com',
            password: '123456'
        })

        expect(ong).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        )
    })

})