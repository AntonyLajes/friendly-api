import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function createLocationAndOng() {
    
    const location = await prisma.location.create({
        data: {
            city: 'São Paulo',
            state: 'São Paulo'
        }
    })

    const ong = await prisma.ong.create({
        data: {
            name: 'Ong 1',
            address: 'Rua 1',
            phone_number: '12987654321',
            location_id: location.id,
            email: 'email@email.com',
            password: await hash('123456', 6)
        }
    })

    return {
        location,
        ong,
    }

}