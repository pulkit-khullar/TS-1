"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const inventory_1 = require("../controllers/inventory");
const cart_1 = require("../controllers/cart");
const auth_1 = require("../controllers/auth");
class BaseRoutes {
    constructor() {
        this.userController = new user_1.UserController();
        this.inventoryController = new inventory_1.InventoryController();
        this.cartController = new cart_1.CartController();
        this.authController = new auth_1.AuthController();
        this.router = express_1.Router();
        this.allRoutes();
    }
    allRoutes() {
        this.router.get("/", (req, res) => {
            res.send('API HOME');
        });
        this.router.post("/login", this.userController.login);
        this.router.post("/register", this.userController.register);
        this.router.post("/addInvnetory", this.inventoryController.addInvnetory);
        this.router.post("/getInvnetory", this.inventoryController.getInventory);
        this.router.post("/getCart", this.authController.verifyJwt, this.cartController.getCart);
        this.router.post("/cartOpearations", this.authController.verifyJwt, this.cartController.cartOpearations);
    }
}
exports.BaseRoutes = BaseRoutes;
