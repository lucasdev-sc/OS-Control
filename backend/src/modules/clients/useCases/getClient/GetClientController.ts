import { Request, Response } from "express";
import { GetClientUseCase } from "./GetClientUseCase";

export class GetClientController {
    async handle(req: Request, res: Response) {

        const getClientUseCase = new GetClientUseCase()

        const result = await getClientUseCase.execute()

        return res.status(200).json(result)
    }
}