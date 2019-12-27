import express from "express";
import AutoTestApiRouter from "./AutoTestApiRouter";

export default class BaseRouter {

    private gAutoTestApiRouter: AutoTestApiRouter;
    private DUMMY_ROBOT_ROOT_API: string = "/dummy/autoTest-api";

    constructor() {
        console.log("init AutoTestApiRouter");
        this.gAutoTestApiRouter = new AutoTestApiRouter();
    }

    public baseRouter(): express.Router {
        const router = express.Router();
        router.use(this.DUMMY_ROBOT_ROOT_API, this.gAutoTestApiRouter.robotApi());
        return router;
    }
}
