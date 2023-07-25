import { Service } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetServiceUseCase {
    async execute(): Promise<Service[]> {
        const service = await prisma.service.findMany({
            include: {
                OrderService: {
                    include: {
                        client: true
                    }
                }
            }
        })

        return service
    }
}