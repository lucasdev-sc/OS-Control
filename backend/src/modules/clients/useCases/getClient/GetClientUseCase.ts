import { Client } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetClientUseCase {
    async execute(): Promise<Client[]> {
        const client = await prisma.client.findMany({
            include: {
                OrderService: {
                    include: {
                        service: true
                    }
                }
            }
        })

        return client
    }
}