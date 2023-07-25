import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetUserUseCase {
    async execute(): Promise<User[]> {
        const user = await prisma.user.findMany({})

        return user
    }
}