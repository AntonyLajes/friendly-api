import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FindByIdUseCase } from "../find-by-id";

export function makeFindByIdUseCase(){
    const petsRepository = new PrismaPetsRepository()
    const findByIdUseCase = new FindByIdUseCase(petsRepository)

    return findByIdUseCase
}