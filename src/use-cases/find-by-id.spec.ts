import { PetsRepository } from "@/repositories/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindByIdUseCase } from "./find-by-id";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import exp from "constants";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let petsRepository: PetsRepository
let sut: FindByIdUseCase

describe('Find by Id Use Case', () => {

    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository()
        sut = new FindByIdUseCase(petsRepository)
    })

    it('should be able to find pet by id', async () => {

        const createdPet = await petsRepository.create({
            name: 'Scooby',
            birthdate: '2025-02-17T00:00:00.000Z',
            location_id: '12bdfdc8-de31-4433-b556-bd92b430281d',
            ong_id: 'ad389d12-50c2-4045-aa2d-3c4df48e4282',
            color: 'brown',
            breed: 'mixed'
        })

        const findedPet = await sut.handler(createdPet.id)

        expect(findedPet).toEqual(createdPet)
        
    })

    it('should not be able to find pet by id', async () => {

        await expect(
            sut.handler('a7e62893-e0b9-4087-a789-3257f71350cd')
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
        
    })

})