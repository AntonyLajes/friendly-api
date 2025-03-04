import { Prisma, Ong } from "@prisma/client";
import { OngsRepository } from "../ongs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOngsRepository implements OngsRepository {

    items: Ong[] = []  

    async create(data: Prisma.OngUncheckedCreateInput) {
        const ong: Ong = {
            id: randomUUID(),
            name: data.name,
            address: data.address,
            location_id: data.location_id,
            phone_number: data.phone_number,
            email: data.email,
            password: data.password,
            created_at: new Date()
        }

        this.items.push(ong)

        return ong
    }

}