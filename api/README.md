## Initial installation

```bash
$ yarn install
```

## Running the application

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Automated testing

```bash
# unit tests
$ yarn test

# watch tests
$ yarn test:watch

# coverage tests
$ yarn test:cov

# debug tests
$ yarn test:debug

# e2e tests
$ yarn test:e2e
```

### Execute code formatter and linters

```bash
yarn format
yarn lint
```

### Run migrations

```bash
# automatically generate migration script
$ yarn typeorm:migrate [description of migration]

# manually create empty migration script
$ yarn typeorm:create [description of migration]

# revert migration script
$ yarn typeorm:revert

# execute migration script
$ yarn typeorm:run
```

### Running dev with docker

```bash
# build and spawn containers
$ docker-compose up -d --build

# stop containers
$ docker-compose down
```
