import * as Koa from "koa";
import * as Router from "koa-router";
import * as cors from "@koa/cors";
import * as bodyParser from "koa-bodyparser";

import ErrorHandler from "./middlewares/error";

import userRoutes from "./routes/userRoutes";
import reportRoutes from "./routes/reportRoutes";

import { connectDb } from "./infra/database";

const app = new Koa();
const apiv1 = new Router({ prefix: "/v1" });

connectDb();

app.use(cors());
app.use(bodyParser());
app.use(ErrorHandler.middleware);

app.on("error", ErrorHandler.handler);

apiv1.use(userRoutes.routes());
apiv1.use(reportRoutes.routes());

app.use(apiv1.routes());

export default app;
