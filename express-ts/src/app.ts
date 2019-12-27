import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";
import http from "http";
import createError from "http-errors";
import morgan from "morgan";
// import path from "path";

import BaseRouter from "./routers/BaseRouter";

const port = process.env.PORT ? process.env.PORT : 3002;

const app: express.Application = express();

// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, "../log/", "http.log"), { flags: "a" });
// app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev :date[web] :method :url :status :response-time ms - :res[content-length]"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router
const router: express.Router = (new BaseRouter()).baseRouter();
app.use(router);

app.use((req: express.Request, res: express.Response, next) => {
    next(createError(404));
});

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.send(err);
});

app.set("port", port);

const server: http.Server = http.createServer(app);

server.listen(port, () => {
    const addr = server.address();
    console.log(port, addr);
});

server.on("error", onError);

function onError(error: any): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
