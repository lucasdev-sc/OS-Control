import { Request, Response } from "express";
import { GetOsUseCase } from "./GetOsUseCase";

export class GetOsController {
    async handle(req: Request, res: Response) {

        const getOsUseCase = new GetOsUseCase()

        const result = await getOsUseCase.execute()

        return res.status(200).json(result)
    }
}