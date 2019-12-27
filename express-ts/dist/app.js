"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
// import path from "path";
const BaseRouter_1 = __importDefault(require("./routers/BaseRouter"));
const port = process.env.PORT ? process.env.PORT : 3002;
const app = express_1.default();
// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, "../log/", "http.log"), { flags: "a" });
// app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan_1.default("dev :date[web] :method :url :status :response-time ms - :res[content-length]"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// router
const router = (new BaseRouter_1.default()).baseRouter();
app.use(router);
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.send(err);
});
app.set("port", port);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    const addr = server.address();
    console.log(port, addr);
});
server.on("error", onError);
function onError(error) {
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
//# sourceMappingURL=app.js.map