import { Ong, Prisma } from "@prisma/client";

export interface OngsRepository {
    create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
    findByEmail(email: string): Promise<Ong | null | undefined>
}