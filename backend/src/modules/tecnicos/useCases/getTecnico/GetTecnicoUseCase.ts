import { Technicion } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetTecnicoUseCase {
    async execute(): Promise<Technicion[]>{
        const tecnico = await prisma.technicion.findMany({})

        return tecnico
    }
}