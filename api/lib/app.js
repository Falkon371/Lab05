"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
    }
    initializeControllers(controller) {
        controller.forEach(element => {
            this.app.use('/', element.router);
        });
    }
    listen() {
        this.app.listen(config_1.config.port, () => {
            console.log(`App listening on the port ${config_1.config.port}`);
        });
    }
}
exports.default = App;
