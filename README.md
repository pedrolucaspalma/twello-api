# twello-api

Welcome to the twello API!

- Creating a migration:

`docker exec twello-api npx typeorm migration:create ./src/database/migrations/migration-name`

- Running migrations:

`docker exec twello-api npm run db:migrate`

- Reverting last migration

`docker exec twello-api npm run db:revert-one`
