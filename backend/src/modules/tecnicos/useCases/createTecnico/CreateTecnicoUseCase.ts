import { Technicion } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import uuid4 from "uuid4";
import { ICreateTecnicoDTO } from "../../dtos/createTecnicoDTO";

export class CreateTecnicoUseCase {
    async execute(body: ICreateTecnicoDTO): Promise<Technicion> {
        const tecnico = await prisma.technicion.create({
            data: {
                name: body.name,
                email: body.email,
                cpf: body.cpf,
                number: body.number,
                payment: body.payment,
                // status: true,
                id: uuid4()
            }
        })

        return tecnico
    }
}