import { Ong, Prisma } from "@prisma/client";

export interface OngsRepository {
    create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
}