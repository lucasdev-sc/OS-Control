import { prisma } from "../../../../prisma/client";
import * as bcrypt from 'bcrypt'
import { ILoginUserDTO } from "../../dtos/loginUserDTO";
import { User } from "@prisma/client";
import { AppError } from "../../../../err/AppError";

export class LoginUserUseCase {
    async execute(body: ILoginUserDTO): Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        // Verificar se o usuário existe para logar
        if(user && (await bcrypt.compare(body.password, user.password))){
            return user
        } else throw new AppError("User não encontrado!")

    }
}