import { Router, Application, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user';
import { InventoryController } from '../controllers/inventory';
import { CartController } from '../controllers/cart';
import { AuthController } from '../controllers/auth';

export class BaseRoutes {

    router: Router;
    private userController: UserController = new UserController();
    private inventoryController: InventoryController = new InventoryController();
    private cartController: CartController = new CartController();
    private authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.allRoutes();
    }

    async allRoutes() {
        this.router.get("/", (req: Request, res: Response) => {
            return res.send('API HOME');
        });

        this.router.post("/login", this.userController.login);
        this.router.post("/register", this.userController.register);

        this.router.post("/addInvnetory", this.inventoryController.addInvnetory);
        this.router.post("/getInvnetory", this.inventoryController.getInventory);

        this.router.post("/getCart", this.authController.verifyJwt, this.cartController.getCart);
        this.router.post("/cartOpearations", this.authController.verifyJwt, this.cartController.cartOpearations);
    }
}