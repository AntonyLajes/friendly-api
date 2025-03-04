import { OngsRepository } from "@/repositories/ongs-repository";
import { hash } from "bcrypt"

interface CreateOngUseCaseRequest {
    name: string
    location_id: string
    address: string
    phone_number: string,
    email: string,
    password: string
}

export class CreateOngUseCase {

    constructor(private ongsRepository: OngsRepository){}

    async handler({ name, address, phone_number, location_id, email, password }: CreateOngUseCaseRequest){
        const passwordHash = await hash(password, 6)
        
        const ong = await this.ongsRepository.create({
            name,
            address,
            phone_number,
            location_id,
            email,
            password: passwordHash
        })

        return ong
    }
}