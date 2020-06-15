import { getHashedPassword, getJwtPayload } from '../helpers/helpers';
import server from '../index';
import supertest from 'supertest';

var serve: server;
var request: any;

beforeAll(async () => {
    serve = await new server();
    request = await supertest(serve.app);
});

describe('Testing helper functions', () => {

    test('testing hashed password function', async (done) => {
        const samplePassword = 'sample';
        expect(async () => { await getHashedPassword(samplePassword); }).not.toThrow();
        done();
    });

    test('testing get jwt payload function', async (done) => {
        const result = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit"
        });
        expect(result.header['auth-token']).not.toEqual(null);
        const auth = result.header['auth-token'];
        expect(await getJwtPayload(auth)).not.toEqual(null);

        try {
            await getJwtPayload(null);
        } catch (error) {
            expect(error.message).toEqual("Error while getting userID");
        }

        done();
    });
});

describe('Testing inventory controller', () => {

    test('testing getInventory', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit"
        })
        expect(login.header['auth-token']).not.toEqual(null);
        const auth = login.header['auth-token'];

        const inventory = await request.post("/api/getInvnetory").set({
            'auth-token': auth
        }).send();
        expect(inventory).not.toEqual(null);

        done();
    });

    test('Testing addInventory', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit"
        })
        expect(login.header['auth-token']).not.toEqual(null);
        const auth = login.header['auth-token'];

        const inventory = await request.post("/api/addInvnetory").set({
            'auth-token': auth
        }).send({
            "name": Date.now() + "",
            "description": "description 2",
            "price": 1255,
            "make": 2001
        });
        expect(inventory).not.toEqual(null);

        const inventoryErr = await request.post("/api/addInvnetory").set({
            'auth-token': auth + 'exception'
        }).send({
            "name": Date.now() + "",
            "description": "description 2",
            "price": 1255,
            "make": 2001.52
        });
        expect(inventoryErr.status).toEqual(500);
        expect(inventoryErr.text).toEqual("\"make\" must be an integer");

        done();
    });
});

describe('Testing user controller', () => {

    test('testing login body validation', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: 654654
        });
        expect(login.status).toEqual(500);
        expect(login.text).toEqual("\"password\" must be a string");

        done();
    });

    test('testing login invalid username and password', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit2"
        })
        expect(login.status).toEqual(500);
        expect(login.text).toEqual("Username or password is incorrect!");

        done();
    });

    test('testing registration invalid body', async (done) => {
        const register = await request.post("/api/register").send({
            username: "pulkit",
            password: 5454
        })
        expect(register.status).toEqual(500);
        expect(register.text).toEqual("\"password\" must be a string");

        done();
    });

    test('testing registration', async (done) => {
        const value = Date.now() + "";
        const register = await request.post("/api/register").send({
            username: value,
            password: value
        })
        expect(register.status).toEqual(200);
        expect(register.text).not.toEqual(null);

        const register2 = await request.post("/api/register").send({
            username: value,
            password: value
        })
        expect(register2.status).toEqual(500);
        expect(register2.text).toContain("duplicate key error collection");

        done();
    });
});

describe('Testing cart controller', () => {

    test('testing getCart', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit"
        });
        expect(login.header['auth-token']).not.toEqual(null);
        const auth = login.header['auth-token'];

        const cart = await request.post("/api/getCart").set({
            'auth-token': auth
        }).send();
        expect(cart).not.toEqual(null);

        done();
    });

    test('testing invalid user', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit"
        });
        expect(login.header['auth-token']).not.toEqual(null);
        const auth = login.header['auth-token'];

        const cart = await request.post("/api/getCart").set({
            'auth-token': auth + '_invalid'
        }).send();
        expect(cart.status).toEqual(500);
        expect(cart.text).toEqual("Invalue User!");

        done();
    });

    test('testing getCart - UnAuthorised', async (done) => {
        const cart = await request.post("/api/getCart").send();
        expect(cart).not.toEqual(null);

        done();
    });
    
    test('testing cartOpearations', async (done) => {
        const login = await request.post("/api/login").send({
            username: "pulkit",
            password: "pulkit"
        });
        expect(login.header['auth-token']).not.toEqual(null);
        const auth = login.header['auth-token'];

        const inventory = await request.post("/api/getInvnetory").set({
            'auth-token': auth
        }).send();
        expect(inventory.status).toEqual(200);
        expect(inventory.text).not.toEqual(null);

        const data = JSON.parse(inventory.text);

        const cartAdd = await request.post("/api/cartOpearations").set({
            'auth-token': auth
        }).send({
            "operation": "ADD",
            "productId": data[0]._id
        });
        expect(cartAdd.status).toEqual(200);

        const cartSub = await request.post("/api/cartOpearations").set({
            'auth-token': auth
        }).send({
            "operation": "SUB",
            "productId": data[0]._id
        });
        expect(cartSub.status).toEqual(200);

        const bodyValidation = await request.post("/api/cartOpearations").set({
            'auth-token': auth
        }).send({
            "operation": 100,
            "productId": data[0]._id
        });
        expect(bodyValidation.status).toEqual(500);

        const invalidOperation = await request.post("/api/cartOpearations").set({
            'auth-token': auth
        }).send({
            "operation": 'MUL',
            "productId": data[0]._id
        });
        expect(invalidOperation.status).toEqual(500);

        done();
    });
});

describe('Testing api', () => {

    test('testing api home', async (done) => {
        const login = await request.get("/api/").send();
        expect(login.status).toEqual(200);
        expect(login.text).toEqual('API HOME');
        done();
    });

});
