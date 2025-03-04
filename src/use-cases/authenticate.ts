import { OngsRepository } from "@/repositories/ongs-repository";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

export class AuthenticateUseCase {

    constructor(private ongsRepository: OngsRepository){}

    async handler({ email, password }: AuthenticateUseCaseRequest){  
        const ong = await this.ongsRepository.findByEmail(email)

        if(!ong) throw new InvalidCredentialsError()

        const doesPasswordMatches = await compare(password, ong.password)

        if(!doesPasswordMatches) throw new InvalidCredentialsError()
        
        return ong
    }

}