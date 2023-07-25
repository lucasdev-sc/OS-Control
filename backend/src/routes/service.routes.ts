import { Router } from 'express'
import { CreateServiceController } from '../modules/services/useCases/createService/CreateServiceController'
import { GetServiceController } from '../modules/services/useCases/getService/GetServiceController'

const serviceRoutes = Router()
const createServiceController = new CreateServiceController()
const getServiceController = new GetServiceController()

serviceRoutes.post('/register', createServiceController.handle)
serviceRoutes.get('/', getServiceController.handle)

export { serviceRoutes }