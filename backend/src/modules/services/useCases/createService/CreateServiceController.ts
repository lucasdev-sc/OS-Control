import { Request, Response } from "express";
import { ICreateServiceDTO } from "../../dtos/createServiceDTO";
import { CreateServiceUseCase } from "./CreateServiceUseCase";

export class CreateServiceController {
    async handle(req: Request, res: Response) {
        const body: ICreateServiceDTO = await req.body

        const createServiceUseCase = new CreateServiceUseCase()

        const result = createServiceUseCase.execute(body)

        return res.status(201).json(result)
    }
}