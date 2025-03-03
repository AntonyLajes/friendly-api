import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data: data
        })

        return pet
    }

    async findManyByLocation(locationId: string) {
        const pets = await prisma.pet.findMany({
            where: {
                location_id: locationId,
                avaliable: true
            }
        })

        return pets
    }

}