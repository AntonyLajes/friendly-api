import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchAvailablePetsByLocationUseCaseRequest {
    locationId: string
}

export class FetchAvailablePetsByLocationUseCase {

    constructor(private petsRepository: PetsRepository){}

    async handler({ locationId }: FetchAvailablePetsByLocationUseCaseRequest) {
        const pets = await this.petsRepository.findManyByLocation(locationId)
    
        return pets
    }
}