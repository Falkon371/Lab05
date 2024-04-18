import { request } from "http";
import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import { checkIdParam } from "../middlewares/deviceIdParam.middleware";


let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller{
    public path = '/api/data';
    public router = Router();
    dataService: any;
  

    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, 
        this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, checkIdParam,
        this.getById);
        this.router.get(`${this.path}/num`,checkIdParam , 
        this.getDataByRange);
        this.router.post(`${this.path}/:id`,checkIdParam, this.addData);
        this.router.delete(`${this.path}/all`,checkIdParam, this.deleteAll);
        this.router.delete(`${this.path}/:id`,checkIdParam ,this.deleteById);
    }
 

    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const index = parseInt(id); 
        const data = testArr[index];
 
        response.status(200).json(data);
     };

private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const index = parseInt(id); 
    const data = Math.max(...testArr);
 
    response.status(200).json(data);
 
};


private addData = async (request: Request, response: Response, next: NextFunction) => {
    const { air } = request.body;
    const { id } = request.params;

    const data = {
        temperature: air[0].value,
        pressure: air[1].value,
        humidity: air[2].value,
        deviceId: id,
        readingDate: new Date() 
    };

    try {
        await this.dataService.createData(data);
        response.status(200).json(data);
    } catch (error) {
        console.error(`Validation Error: ${error}`);
        response.status(400).json({ error: 'Invalid input data.' });
    }
};
 


private getDataByRange = async(request: Request, response: Response, next: NextFunction) =>{
    const { id , num } = request.params;
    const index = parseInt(id);
    const count = parseInt(num);
    const data = testArr.slice(index, index + count)

    response.status(200).json(data);

}

private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
    testArr = [];
    response.status(204).send();
};

private deleteById = async(request: Request, response: Response, next: NextFunction) =>{
    const { id } = request.params;
    const index = parseInt(id);
    testArr.splice(index, 1);

    response.status(204).send();
}

 }
 

export default DataController;