import { Service } from "@prisma/client";
import { ICreateServiceDTO } from "../../dtos/createServiceDTO";
import { prisma } from "../../../../prisma/client";
import uuid4 from "uuid4";

export class CreateServiceUseCase {
    async execute(body: ICreateServiceDTO): Promise<Service> {
        const service = prisma.service.create({
            data: {
                name: body.name,
                id: uuid4(),
                price: body.price,
                idCliente: body.idClient,
            }
        })

        return service
    }
}