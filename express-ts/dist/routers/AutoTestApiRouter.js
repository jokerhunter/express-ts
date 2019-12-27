"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
class AutoTestApiRouter {
    constructor() {
        this.baseUrl = "http://127.0.0.1:3001/dummy/robot-api";
        console.log("init RobotApiRouter");
    }
    robotApi() {
        const router = express_1.default.Router();
        router.get("/start", (req, res) => __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const status = await axios.get(this.baseUrl + "/robot/status");
            //     if (status) {
            //         await axios.get(this.baseUrl + "/robot/actionGroups/123");
            //     }
            // } catch (err) {
            //     console.log(err);
            // }
            axios_1.default.get("http://localhost:3001/dummy/robot-api/robot/status", {
                proxy: false,
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
            res.send("start");
        }));
        router.get("/command/:id", (req, res) => {
            console.log("/command/:id");
            setTimeout(() => {
                axios_1.default.get(this.baseUrl + "/robot/command/isOK");
            }, 5000);
            res.send(req.params.id);
        });
        router.get("/actionGroupsCallback/isOK", (req, res) => {
            console.log("actionGroupsCallback/isOK");
            res.send("OK");
        });
        return router;
    }
}
exports.default = AutoTestApiRouter;
//# sourceMappingURL=AutoTestApiRouter.js.map