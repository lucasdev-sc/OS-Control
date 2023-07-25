import { Request, Response } from "express";
import { ICreateTecnicoDTO } from "../../dtos/createTecnicoDTO";
import { CreateTecnicoUseCase } from "./CreateTecnicoUseCase";

export class CreateTecnicoController {
    async handle(req: Request, res: Response) {
        const body: ICreateTecnicoDTO = await req.body

        const createTecnicoUseCase = new CreateTecnicoUseCase()

        const result = await createTecnicoUseCase.execute(body)

        return res.status(201).json(result)
    }
}