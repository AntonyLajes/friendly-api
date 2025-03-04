import { PrismaOngsRepository } from "@/repositories/prisma/prisma-ongs-repository";
import { CreateOngUseCase } from "../create-ong";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase(){

    const ongsRepository = new PrismaOngsRepository()
    const authenticateUseCase = new AuthenticateUseCase(ongsRepository)

    return authenticateUseCase
}