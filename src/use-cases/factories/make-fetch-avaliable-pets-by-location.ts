import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchAvailablePetsByLocationUseCase } from "../fetch-avaliable-pets-by-location";

export function makeFetchAvailablePetsByLocationUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const fetchAvailablePetsByLocationUseCase = new FetchAvailablePetsByLocationUseCase(petsRepository)

    return fetchAvailablePetsByLocationUseCase
}