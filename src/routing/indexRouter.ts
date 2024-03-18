import ExpressAdapter, {
    Response,
    Request
} from "../adapters/expressAdapter";
import loginRouter from "./loginRouter";

const adapter = new ExpressAdapter();

const indexRouter = () => {
    const iRouter = adapter.createRouter();

    adapter.middlewarePersonalized({
        router: iRouter,
        middleware: (_req: Request, _res: Response, next) => {
            console.log('Middleware from indexRouter');
            next();
        }
    })

    adapter.setRouter({
        route: '/auth',
        router: iRouter,
        callbackRouter: loginRouter()
    });

    return iRouter;
}

export default indexRouter;