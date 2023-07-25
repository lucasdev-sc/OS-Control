import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "../../dtos/createUserDTO";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const body: ICreateUserDTO = await req.body

        const createUserUseCase = new CreateUserUseCase()

        const result = await createUserUseCase.execute(body)

        return res.status(201).json(result)
    }
}