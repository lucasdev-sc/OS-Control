import { Client } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import * as bcrypt from 'bcrypt'
import uuid4 from "uuid4";
import { ICreateClientDTO } from "../../dtos/createClientDTO";

export class CreateClientUseCase {
    async execute(body: ICreateClientDTO): Promise<Client> {
        // Cria o cliente
        const client = await prisma.client.create({
            data: {
                name: body.name,
                number: body.number,
                status: true,
                id: uuid4(),
                nameContact: body.nameContact
            }
        })

        return client
    }
}