import { OrderService } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetOsUseCase {
    async execute(): Promise<OrderService[]> {
        const orderService = await prisma.orderService.findMany({
            include: {
                client: true,
                service: true,
                technicion: true
            }
        })

        return orderService
    }
}