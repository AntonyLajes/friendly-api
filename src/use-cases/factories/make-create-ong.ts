import { PrismaOngsRepository } from "@/repositories/prisma/prisma-ongs-repository";
import { CreateOngUseCase } from "../create-ong";

export function makeCreateOngUseCase(){

    const ongsRepository = new PrismaOngsRepository()
    const createOngUseCase = new CreateOngUseCase(ongsRepository)

    return createOngUseCase
}