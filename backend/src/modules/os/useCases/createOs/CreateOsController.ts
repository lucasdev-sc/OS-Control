import { Request, Response } from "express";
import { IOs } from "../../dtos/createOsDTO";
import { CreateOsUseCase } from "./CreateOsUseCase";

export class CreateOsController {
    async handle(req: Request, res: Response) {
        const body: IOs = await req.body

        const createOsUseCase = new CreateOsUseCase()

        const result = await createOsUseCase.execute(body)

        return res.status(201).json(result)
    }
}