import ExpressAdapter, {
    Response,
    Request,
    NextFunction
} from "../adapters/expressAdapter";

const adapter = new ExpressAdapter();

const loginRouter = () => {
    const router = adapter.createRouter();

    const probe = async (_req: Request, _res: Response, next: NextFunction) => {
        console.log("Paso por el middleware de login");
        next();
    }

    const probe2 = async (_req: Request, _res: Response, next: NextFunction) => {
        console.log("Paso por el middleware de login 2");
        next();
    }

    const probe3 = async (_req: Request, res: Response) => {
        res.send("<h1>Hello from login<h1>");
    }


    adapter.setRouteRouter({
        method: 'get',
        route: '/login',
        router,
        callback: [probe, probe2, probe3]
    });

    return router;
}

export default loginRouter;