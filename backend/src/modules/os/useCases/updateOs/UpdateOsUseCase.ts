import { prisma } from "../../../../prisma/client";

export class UpdateOsUseCase {
    async execute(id: string) {
        const updateOs = await prisma.orderService.update({
            where: {
                id: id
            },
            data: {
                status: false
            },
        })
        return updateOs
    }
}