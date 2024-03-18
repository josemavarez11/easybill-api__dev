/**
 * This file is the entry point for the EasyBill API.
 * @author José Mavárez
 * @author Uldren Gedde
 */

import ExpressAdapter from './adapters/expressAdapter';
import corsMiddleware from './middlewares/corsMiddleware';
import reqReceivedMiddleware from './middlewares/reqReceivedMiddleware';
import indexRouter from './routing/indexRouter';
import _mongoConnection from './db/mongoConnection';
import skuGenerator from './utils/skuGenerator';


const adapter = new ExpressAdapter({ portDefault: 3000 });

adapter.middlewareJSON();
adapter.middlewareURLEncoded();
adapter.middlewarePersonalized({ middleware: corsMiddleware })
adapter.middlewarePersonalized({ middleware: reqReceivedMiddleware });


adapter.setRouteApp({ route: '/api', callbackRouter: indexRouter() });

const result = skuGenerator({
    productId: '123',
    productName: 'Balon',
    category: 'Deportes'
});

adapter.startServer(() => {

    console.log(result);
    console.log(`Server started at http://localhost:${adapter.port}`);
});