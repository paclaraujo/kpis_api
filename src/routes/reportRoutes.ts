import * as Router from "koa-router";
import ReportController from "../controllers/ReportController";

const router = new Router();

router.get("/report/leader/:leaderId/subordinates", ReportController.getReport);

export default router;
