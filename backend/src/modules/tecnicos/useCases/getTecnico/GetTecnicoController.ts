import { Request, Response } from "express";
import { GetTecnicoUseCase } from "./GetTecnicoUseCase";

export class GetTecnicoController {
    async handle(req: Request, res: Response) {
        const getTecnicoUseCase = new GetTecnicoUseCase()

        const result = await getTecnicoUseCase.execute()

        return res.status(200).json(result)
    }
}