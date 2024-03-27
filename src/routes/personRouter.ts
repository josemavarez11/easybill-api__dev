import ExpressAdapter from "../adapters/expressAdapter";
import PersonController from "../controllers/personController";

const adapter = new ExpressAdapter();

const personRouter = () => {
    const router = adapter.createRouter();
    const personController = new PersonController();

    adapter.setRouteRouter({
        method: 'post',
        route: '/createCustomer',
        router,
        callback: [personController.createCustomer]
    });

    adapter.setRouteRouter({
        method: 'get',
        route: '/typesDocument',
        router,
        callback: [personController.typeDocuments]
    })

    return router;
}

export default personRouter;