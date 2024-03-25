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

    return router;
}

export default personRouter;