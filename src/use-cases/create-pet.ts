import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
    name: string;
    birthdate: Date | string;
    locationId: string;
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
    
    constructor(private petsRepository: PetsRepository){}

    async handler({name, birthdate, locationId}: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const pet = await this.petsRepository.create({
            name,
            birthdate,
            location_id: locationId
        })

        return {
            pet
        }
    }
}