import { Router } from 'express';

import { userRoutes } from './user.routes';
import { clientRoutes } from './client.routes';
import { tecnicoRoutes } from './tecnico.routes';
import { serviceRoutes } from './service.routes';
import { osRoutes } from './os.routes';
const routes = Router()

routes.use('/users', userRoutes)
routes.use('/clients', clientRoutes)
routes.use('/tecnico', tecnicoRoutes)
routes.use('/os', osRoutes)
routes.use('/services', serviceRoutes)

export { routes }