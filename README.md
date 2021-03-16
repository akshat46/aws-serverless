# aws-serverless

_This doc assumes you have node(npm, npx) installed._

Clone the repository and do the following: 

## Basic Install and Run

```bash
cd nextjs
npm i
npm run dev
```
go to `localhost:3000` to view the app.

## IoT Demo

Node service in `iotmock/` simulates a device and realtime values can be seen on the device page in webapp. Steps to demo:

- run webapp
```
cd nextjs
npm i
npm run dev
```

- go to `localhost:3000/`

- click on `Devices` or `login` in navbar

- login or create an account

- create a new device and note down its name

- unzip the provided ceritificates folder in `iotmock` directory such that the directory structure looks as following:

```
iotmock
├── certs
│   ├── private.pem.key
│   ├── public.pem.key
│   ├── root-ca.pem
│   └── thing-certificate.pem.crt
├── index.js
├── package.json
```

- run node service ***with specific name of your device as argument***
```
cd iotmock
npm run start --name <device-name>
```

- while this process is running, go to the dashboard and click on device with the given name. 

- the device values should be updating realtime and will stop once the iotmock service is ended.

- _iotmock service uses `device1` as default device name and its values are also recieved by the dashboard. if dashboard device's name does not match the name of the iotmock device, real time values don't show up but can still be viewed in the browser console._

## Sections

Each section of the project is divided in apt directories: 

### iotmock: 

Contains a node service that mocks an iot device. Steps to do so include: 

```bash
cd iotmock
npm i
npm run start
```

You can specify the name of the device that you want to mock with `--name` option:

```bash 
npm run start --name <device-name>
```

### nextjs

Consists of the frontend code for the web application. To run:

```bash
cd nextjs
npm i
npm run dev
```

_It runs on local host `3000` port. If that port is occupied you can use `npx next dev -p 8080` to run on a different port._

### knexjs

Contains all the migrations to the database. The migrations can be recreated by:

```bash 
cd knexjs
npm i 
```

change `knexfile.js` database credentials to your database's endpoints. and then:

```bash
npx knex migrate:latest --knexfile db/knexfile.js
```

_Migrations won't work on the default database since the RDS's network rule have been set such that they only allows certain ip address to run the migrations from._

### serverless

Contains all the lambda functions deployed with serverless framework. To deploy functions to personal AWS

```bash
npm i
npm i -g serverless
serverless login
serverless deploy
```

