/**
 * This file is the entry point for the EasyBill API.
 * @author José Mavárez
 * @author Uldren Gedde
 */

import ExpressAdapter from './adapters/expressAdapter';
import corsMiddleware from './middlewares/corsMiddleware';
import reqReceivedMiddleware from './middlewares/reqReceivedMiddleware';
import indexRouter from './routing/indexRouter';
import mongoConnection from './db/mongoConnection';
import _dotenv from 'dotenv';


const adapter = new ExpressAdapter({ portDefault: 4000 });

adapter.middlewareJSON();
adapter.middlewareURLEncoded();
adapter.middlewarePersonalized({ middleware: corsMiddleware })
adapter.middlewarePersonalized({ middleware: reqReceivedMiddleware });
mongoConnection();
adapter.setRouteApp({ route: '/api', callbackRouter: indexRouter() });

adapter.startServer(() => {
    console.log(`Server started at http://localhost:${adapter.port}`);
});