import ExpressAdapter, {
    Response,
    Request
} from "../adapters/expressAdapter";
import authRouter from "./authRouter";
import personRouter from "./personRouter";

const adapter = new ExpressAdapter();

const indexRouter = () => {
    const iRouter = adapter.createRouter();

    adapter.middlewarePersonalized({
        router: iRouter,
        middleware: (_req: Request, _res: Response, next) => {
            next();
        }
    })

    adapter.setRouter({
        route: '/auth',
        router: iRouter,
        callbackRouter: authRouter()
    });

    adapter.setRouter({
        route: '/person',
        router: iRouter,
        callbackRouter: personRouter()
    });

    return iRouter;
}

export default indexRouter;