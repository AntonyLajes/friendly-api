import { PetsRepository } from "@/repositories/pets-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreatePetUseCase } from "./create-pet"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"

let petsRepository: PetsRepository
let createPetUseCase: CreatePetUseCase  

describe('Create Pet Use Case', () => {

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        createPetUseCase = new CreatePetUseCase(petsRepository)
    })

    it('should be able to create a pet', async () => {

        const pet = await createPetUseCase.handler({
            name: 'Scooby',
            birthdate: '2025-02-17T00:00:00.000Z',
            locationId: '12bdfdc8-de31-4433-b556-bd92b430281d'
        })

        expect(pet).toEqual(
            expect.objectContaining({
                pet: expect.objectContaining({
                    name: 'Scooby',
                    location_id: "12bdfdc8-de31-4433-b556-bd92b430281d",
                    "avaliable": true
                })
            })
        )
    })

})