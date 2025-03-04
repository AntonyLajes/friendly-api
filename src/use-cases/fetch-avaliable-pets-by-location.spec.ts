import { beforeEach, describe, expect, it } from "vitest";
import { FetchAvailablePetsByLocationUseCase } from "./fetch-avaliable-pets-by-location";
import { PetsRepository } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let petsRepository: PetsRepository
let sut: FetchAvailablePetsByLocationUseCase 

describe('Fetch Avaliable Pets by Location Use Case', () => {

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new FetchAvailablePetsByLocationUseCase(petsRepository)
    })

    it('should be able to fetch pet by location', async () => {
        await petsRepository.create({
            name: `Pet 0`,
            birthdate: new Date(2025, 1, 11),
            location_id: '84cf7875-7633-4144-a9c8-42e3720e00f3'
        })
        
        for(let i = 1; i < 4; i++) {
            await petsRepository.create({
                name: `Pet ${i}`,
                birthdate: new Date(2025, 1, 15),
                location_id: '12bdfdc8-de31-4433-b556-bd92b430281d'
            })
        }

        const petsByLocation = await sut.handler({
            locationId: '12bdfdc8-de31-4433-b556-bd92b430281d',
            color: null,
            breed: null
        })

        expect(petsByLocation).toHaveLength(3)
    })

})