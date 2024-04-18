"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const index_controller_1 = __importDefault(require("./controllers/index.controller"));
const app = new app_1.default([
    new index_controller_1.default()
]);
app.listen();
