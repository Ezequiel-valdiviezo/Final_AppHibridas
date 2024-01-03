import  express  from 'express';
import routeJuegos from './indexJuegos.js';
import routeJueces from './indexJueces.js';
import routeUsers from './indexUsers.js';

function routerIndex(app) {
    const route = express.Router();
    app.use('/api', route)
    route.use('/juegos', routeJuegos)
    route.use('/jueces', routeJueces)
    route.use('/users', routeUsers)
  }

export {
    routerIndex
}

export default {
    routerIndex
}