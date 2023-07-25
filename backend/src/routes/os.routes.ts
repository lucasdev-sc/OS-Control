import { Router } from 'express'
import { CreateOsController } from '../modules/os/useCases/createOs/CreateOsController'
import { GetOsController } from '../modules/os/useCases/getOs/GetOsController'
import { UpdateOsController } from '../modules/os/useCases/updateOs/updateOsController'

const createOsController = new CreateOsController()
const getOsController = new GetOsController()
const updateOsController = new UpdateOsController()

const osRoutes = Router()

osRoutes.post('/register', createOsController.handle)
osRoutes.get('/', getOsController.handle)
osRoutes.put('/confirm/:id', updateOsController.handle)

export { osRoutes }