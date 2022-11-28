import * as Router from "koa-router";
import UserController from "../controllers/UserController";

const router = new Router();

router.post("/validateUserEmail", UserController.validateUserEmail);

export default router;
