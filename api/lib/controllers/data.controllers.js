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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];
class DataController {
    constructor() {
        this.path = '/api/data';
        this.router = (0, express_1.Router)();
        this.getById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const index = parseInt(id);
            const data = testArr[index];
            response.status(200).json(data);
        });
        this.getLatestReadingsFromAllDevices = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const index = parseInt(id);
            const data = Math.max(...testArr);
            response.status(200).json(data);
        });
        this.addData = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { elem } = request.body;
            const { id } = request.params;
            if (typeof elem != 'number') {
                return response.status(400).json({ error: 'elem to numer !' });
            }
            const index = parseInt(id);
            testArr.push(elem);
            response.status(200).json(testArr);
        });
        this.getDataByRange = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { id, num } = request.params;
            const index = parseInt(id);
            const count = parseInt(num);
            const data = testArr.slice(index, index + count);
            response.status(200).json(data);
        });
        this.deleteAll = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            testArr = [];
            response.status(204).send();
        });
        this.deleteById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const index = parseInt(id);
            testArr.splice(index, 1);
            response.status(204).send();
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.get(`${this.path}/num`, this.getDataByRange);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.delete(`${this.path}/all`, this.deleteAll);
        this.router.delete(`${this.path}/:id`, this.deleteById);
    }
}
exports.default = DataController;
