import { Application, Session } from "./deps.js";
import { store } from "./database/database.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();

app.use(errorMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(Session.initMiddleware(store));
app.use(router.routes());

export { app };
