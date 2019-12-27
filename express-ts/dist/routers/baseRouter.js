"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AutoTestApiRouter_1 = __importDefault(require("./AutoTestApiRouter"));
class BaseRouter {
    constructor() {
        this.DUMMY_ROBOT_ROOT_API = "/dummy/autoTest-api";
        console.log("init AutoTestApiRouter");
        this.gAutoTestApiRouter = new AutoTestApiRouter_1.default();
    }
    baseRouter() {
        const router = express_1.default.Router();
        router.use(this.DUMMY_ROBOT_ROOT_API, this.gAutoTestApiRouter.robotApi());
        return router;
    }
}
exports.default = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map