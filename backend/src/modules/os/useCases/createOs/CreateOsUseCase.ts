import { OrderService } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import uuid4 from "uuid4";
import { IOs } from "../../dtos/createOsDTO";

export class CreateOsUseCase {
    async execute(body: IOs): Promise<OrderService> {
        let i = 1;
        const OrderService = await prisma.orderService.create({
            data: {
                date: body.date,
                numOs: body.numOs || i+i.toString(),
                obs: body.obs,
                plate: body.plate,
                idCliente: body.idCliente,
                idService: body.idService,
                idTechnicion: body.idTechnicion,
                status: true,
                id: uuid4()
            }
        })

        return OrderService
    }
}