## To run the docker in background
docker compose up dev-db -d

## How to run the project
Commands are modified and written in package.json file
First up the docker with db
Run the migration of the prisma (prisma:dev:migrate || prisma:dev:deploy || prisma:test:deploy)
Then start the project (npm run start:dev)

if needed restart the db using single command:
for dev-db(db:dev:restart)
for test-db(db:test:restart)

## What it contains
Login SignUP with all API's payload validation and Authorize with JWT Token using Passport Library and End to End test case with JEST and pactum (for http api call in testcases)

## New Thing to know
To run the test case fire command "test:e2e:watch" but this is hooked to pre command which will run automatically, which can be defined as "pretest:e2e:watch" So first command mentioned with pre will be fired first and then the main command which is fired.

To import the dotenv file while firing the command for different environement then use the package dotenv-cli and mention this line in starting of the command "dotenv -e .env.test -- "

## Description
## Reference
https://www.youtube.com/watch?v=GHTA143_b-s


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
