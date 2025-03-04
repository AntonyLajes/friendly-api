import { Pet, Prisma } from "@prisma/client";

export interface FindManyRequest {
    locationId: string,
    color: string | null,
    breed: string | null
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findById(id: string): Promise<Pet | undefined | null>
    findMany(data: FindManyRequest): Promise<Pet[]>
}