## Description

It is really just a chat application that is using SolidJs on FE and communicates via GraphQL with BE which is NestJs/Prisma/PostgreSQL based

## Prerequisites
Create and fill up .env file in root folder based on .env-dev file for FE and BE. For DB is prepare a docker container in docker-compose.yml

## Installation

FE
```bash
$ pnpm install
```

BE

```bash
$ yarn
```

## Running the app

FE
```bash
$ pnpm dev
```

BE

```bash
$ yarn
```

## Test
BE - Be aware that execution of this command will drop and load fixtures

```bash
# e2e tests
$ yarn test:e2e
```

## Generate 
BE - Generate sections of app

```bash
# plop
$ yarn plop:generate
```

## Stay in touch

- Author - [Marek Mika](https://marekmika.com)

## License

Nest is [MIT licensed](LICENSE).
