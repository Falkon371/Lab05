import App from './app';
import DataController from './controllers/data.controllers';
import IndexController from "./controllers/index.controller";
import UserController from './controllers/user.controller';

const app: App = new App([
   new IndexController(),
   new DataController(),
   new UserController()
]);

app.listen();