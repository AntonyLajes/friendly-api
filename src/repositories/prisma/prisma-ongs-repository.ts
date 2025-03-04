import { Prisma, Ong } from "@prisma/client";
import { OngsRepository } from "../ongs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOngsRepository implements OngsRepository {

    async create(data: Prisma.OngUncheckedCreateInput) {
        const ong = await prisma.ong.create({
            data
        })

        return ong
    }

}