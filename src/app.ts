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


const adapter = new ExpressAdapter({ portDefault: 3000 });

(async () => {
    await mongoConnection();
})();

adapter.middlewareJSON();
adapter.middlewareURLEncoded();
adapter.middlewarePersonalized({ middleware: corsMiddleware })
adapter.middlewarePersonalized({ middleware: reqReceivedMiddleware });

adapter.setRouteApp({ route: '/api', callbackRouter: indexRouter() });

adapter.startServer(() => {

    console.log(`Server started at http://localhost:${adapter.port}`);
});