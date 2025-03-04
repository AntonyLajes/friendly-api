import { Prisma, Pet } from "@prisma/client";
import { FindManyRequest, PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {

    items: Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet: Pet = {
            id: randomUUID(),
            name: data.name,
            birthdate: new Date(data.birthdate),
            location_id: data.location_id,
            ong_id: data.ong_id,
            avaliable: true,
            created_at: new Date(),
            color: data.color ?? null,
            breed: data.breed ?? null
        }

        this.items.push(pet)

        return pet
    }

    async findMany({locationId, breed, color}: FindManyRequest) {
        const petsByLocation = this.items.filter(
            (item) => 
                item.location_id === locationId 
                && item.breed === breed 
                && item.color === color
        )
    
        return petsByLocation
    }

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)

        return pet
    }

}