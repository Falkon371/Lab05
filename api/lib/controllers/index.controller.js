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
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
class IndexController {
    constructor() {
        this.path = '/*';
        this.router = (0, express_1.Router)();
        this.serveIndex = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.serveIndex);
    }
}
exports.default = IndexController;
