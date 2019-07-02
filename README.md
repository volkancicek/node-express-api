
## Build & Run

Node.js must be installed before. (https://nodejs.org/en/download/)

* `npm install`
* `node server.js`


## Libraries

`package.json` file holds dependencies.

```
 "dependencies": {
    "chai": "^4.2.0",
    "config": "^3.1.0",
    "express": "^4.17.1",
    "jsonpath": "^1.0.2",
    "mocha": "^6.1.4",
    "nodemon": "^1.19.1",
    "request": "^2.88.0"
  }
```
## Routing

There are 3 main routes.
```
app.use('/about', router.about);
app.use('/orders', router.orders);
app.use('/customers', router.customers);
```
Corresponding handlers can be found in 'router' folder.

## Data
Sample "json" formatted order and customer data which can be manipulated by the app can be found  in 'data' folder. 

## Config

Environment based different config files can be generated.
Default configuration file -> `config/default.json` 

```
{
  "Application":{
    "Name": "",
    "Version": "1.0.0"
  },
  "Server":{
    "Port": 8888
  }
}
```
##Tests

"mocha" and "chai" libraries are used for unit tests. Sample tests can be found in 'tests' folder.

## Requests

All applicable requests which are defined at Postman can be found at:
`docs/api.postman_collection.json`
This file can be imported into Postman.(https://www.getpostman.com/downloads/)


