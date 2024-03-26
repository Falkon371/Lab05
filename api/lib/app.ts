import express from 'express';
import { config } from './config';
import Controller from './interfaces/controller.interface';
import bodyParser from 'body-parser';
import morgen from 'morgan';

class App{
    public app: express.Application;

    constructor(controllers: Controller[]){
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares(): void{
        this.app.use(bodyParser.json());
        this.app.use(morgen('dev'));
    }

    private initializeControllers(controller: Controller[]): void{
        controller.forEach(element => {
            this.app.use('/', element.router);
        });
    }

    public listen(): void{
        this.app.listen(config.port, () =>{
            console.log(`App listening on the port ${config.port}`);
        });
    }
}

export default App;


