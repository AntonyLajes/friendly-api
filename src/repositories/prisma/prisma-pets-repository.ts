import { Prisma, Pet } from "@prisma/client";
import { FindManyRequest, PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data: data
        })

        return pet
    }

    async findMany({locationId, color, breed}: FindManyRequest){
        const pets = await prisma.pet.findMany({
            where: {
                location_id: locationId,
                avaliable: true,
                color,
                breed
            }
        })

        return pets
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id
            }
        })

        return pet
    }

}