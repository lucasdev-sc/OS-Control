import { Router } from "express";
import { CreateClientController } from "../modules/clients/useCases/createClient/CreateClientController";
import { GetClientController } from "../modules/clients/useCases/getClient/GetClientController";

const createClientController = new CreateClientController()
const getClientController = new GetClientController()

const clientRoutes = Router()

clientRoutes.post("/register", createClientController.handle)
clientRoutes.get("/", getClientController.handle)

export { clientRoutes }