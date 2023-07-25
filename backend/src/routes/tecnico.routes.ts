import { Router } from "express";
import { CreateTecnicoController } from "../modules/tecnicos/useCases/createTecnico/CreateTecnicoController";
import { GetTecnicoController } from "../modules/tecnicos/useCases/getTecnico/GetTecnicoController";

const createTecnicoController = new CreateTecnicoController()
const getTecnicoController = new GetTecnicoController()

const tecnicoRoutes = Router()

tecnicoRoutes.post("/register", createTecnicoController.handle)
tecnicoRoutes.get("/", getTecnicoController.handle)

export { tecnicoRoutes }