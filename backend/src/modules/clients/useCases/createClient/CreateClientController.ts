import { Request, Response } from "express";
import { ICreateClientDTO } from "../../dtos/createClientDTO";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
    async handle(req: Request, res: Response) {
        const body: ICreateClientDTO = await req.body

        const createClientUseCase = new CreateClientUseCase()

        const result = await createClientUseCase.execute(body)

        return res.status(201).json(result)
    }
}