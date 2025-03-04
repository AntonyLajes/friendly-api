import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
    name: string;
    birthdate: Date | string;
    locationId: string;
    color: string | null,
    breed: string | null
}

export class CreatePetUseCase {
    
    constructor(private petsRepository: PetsRepository){}

    async handler({name, birthdate, locationId, color, breed}: CreatePetUseCaseRequest) {
        const pet = await this.petsRepository.create({
            name,
            birthdate,
            location_id: locationId,
            color,
            breed
        })

        return pet
    }
}