import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ICreateUserDTO } from "../../dtos/createUserDTO";
import * as bcrypt from 'bcrypt'
import uuid4 from "uuid4";
import { AppError } from "../../../../err/AppError";

export class CreateUserUseCase {
    async execute(body: ICreateUserDTO): Promise<User> {
        // Verificar se o user já existe
        const userAlreadyExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (userAlreadyExist) {
            throw new AppError("User já existe")
        }

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                cpf: body.cpf,
                status: true,
                id: uuid4()
            }
        })

        return user
    }
}