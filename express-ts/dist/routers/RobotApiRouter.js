"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class RobotApiRouter {
    constructor() {
        console.log("init RobotApiRouter");
    }
    robotApi() {
        const router = express_1.default.Router();
        router.get("/robot/status", (req, res) => {
            console.log("/robot/status");
            res.send("/robot/status");
        });
        router.get("/robot/actionGroups/:id", (req, res) => {
            console.log("/robot/actionGroups/:id");
            res.send(req.params.id);
        });
        router.get("/robot/actionGroupsCallback/isOK", (req, res) => {
            console.log("robot/actionGroupsCallback/isOK");
            res.send("OK");
        });
        return router;
    }
}
exports.default = RobotApiRouter;
//# sourceMappingURL=RobotApiRouter.js.map