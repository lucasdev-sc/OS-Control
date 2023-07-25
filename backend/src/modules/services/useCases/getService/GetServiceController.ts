import { Request, Response } from "express";
import { GetServiceUseCase } from "./GetServiceUseCase";

export class GetServiceController {
    async handle(req: Request, res: Response) {

        const getServiceUseCase = new GetServiceUseCase()

        const result = await getServiceUseCase.execute()

        return res.status(200).json(result)
    }
}