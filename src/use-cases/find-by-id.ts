import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

export class FindByIdUseCase {

    constructor(private petsRepository: PetsRepository) {}

    async handler(id: string) {
        const pet = await this.petsRepository.findById(id)
        
        if(!pet) throw new ResourceNotFoundError()
        
        return pet
    }

}