import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchAvailablePetsByLocationUseCaseRequest {
    locationId: string,
    color: string | null,
    breed: string | null
}

export class FetchAvailablePetsByLocationUseCase {

    constructor(private petsRepository: PetsRepository){}

    async handler({ locationId, color, breed }: FetchAvailablePetsByLocationUseCaseRequest) {
        const pets = await this.petsRepository.findMany({
            locationId,
            color,
            breed
        })
    
        return pets
    }
}