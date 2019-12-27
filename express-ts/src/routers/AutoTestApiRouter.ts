import axios from "axios";
import express from "express";

export default class AutoTestApiRouter {

    private baseUrl: string = "http://127.0.0.1:3001/dummy/robot-api";
    constructor() {
        console.log("init RobotApiRouter");
    }

    public robotApi(): express.Router {
        const router = express.Router();
        router.get("/start", async (req: express.Request, res: express.Response) => {
            // try {
            //     const status = await axios.get(this.baseUrl + "/robot/status");
            //     if (status) {
            //         await axios.get(this.baseUrl + "/robot/actionGroups/123");
            //     }
            // } catch (err) {
            //     console.log(err);
            // }
            axios.get("http://localhost:3001/dummy/robot-api/robot/status", {
                proxy: false,
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
            res.send("start");
        });
        router.get("/command/:id", (req: express.Request, res: express.Response) => {
            console.log("/command/:id");
            setTimeout(() => {
                axios.get(this.baseUrl + "/robot/command/isOK");
            }, 5000);
            res.send(req.params.id);
        });
        router.get("/actionGroupsCallback/isOK", (req: express.Request, res: express.Response) => {
            console.log("actionGroupsCallback/isOK");
            res.send("OK");
        });
        return router;
    }

}
