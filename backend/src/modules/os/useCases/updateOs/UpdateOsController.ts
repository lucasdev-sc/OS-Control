import { Request, Response } from "express";
import { UpdateOsUseCase } from "./UpdateOsUseCase";

export class UpdateOsController {
    async handle(req: Request, res: Response) {
        
        const createOsUseCase = new UpdateOsUseCase()

        const result = await createOsUseCase.execute(req.params.id)

        return res.status(200).json(result)
    }
}