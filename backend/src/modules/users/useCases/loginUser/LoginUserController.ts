import { Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";
import { ILoginUserDTO } from "../../dtos/loginUserDTO";

export class LoginUserController {
    async handle(req: Request, res: Response) {
        const body: ILoginUserDTO = await req.body

        const loginUserUseCase = new LoginUserUseCase()

        const result = await loginUserUseCase.execute(body)

        return res.status(200).json(result)
    }
}