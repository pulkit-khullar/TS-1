### CAMERA STORE

## REQUIREMENTS
- List store inventory
- User Login
- User cart - accessible only after user login
- get cart for specific user

## ROUTES
- ```/api/login```
  Request Body
  ```json
    POST
    {
      "username": "pulkit",
      "password": "pulkit"
    }
  ```

- ```/api/register```
  Request Body
  ```json
    POST
    {
      "username": "pulkit",
      "password": "pulkit"
    }
  ```

- ```/api/addInventory```
  Request Body
  ```json
    POST
    {
      "name": "name 2" ,
      "description": "description 2",
      "price": 1255,
      "make": 2001
    }
  ```
 
 - ```/api/getInventory```
  Request Body
  ```json
    POST
    {}
  ```
  
- ```/api/getCart```
  Request Body
  ```json
    POST
    {}
  ```
    > send the auth token in headers, token will be provided in response header of login
    
    **auth-token:TOKEN**
  
- ```/api/cartOperations```
  Request Body
  ```json
    POST
    {
      "operation": "SUB",
      "productId": "5ee60151ea97389152022f24"
    }
  ```
  > productid - get it from the **getInvnetory** result
  > send the auth token in headers, token will be provided in response header of login
    
    **auth-token:TOKEN**
  
- ```/api/cartOpearations```
  Request Body
  ```json
    POST
    {
      "operation": "ADD",
      "productId": "5ee60151ea97389152022f24"
    }
  ```
  
  > productid - get it from the **getInvnetory** result
  > send the auth token in headers, token will be provided in response header of login
    
    **auth-token:TOKEN**
