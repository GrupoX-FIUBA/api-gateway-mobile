# Template repository for Fastify microservices

This is a template to use as a starting point for Fastify (Node.js) microservice repositories. Once configured, it will run the tests on every pull request to `main`, and will automatically deploy to corresponding Heroku app when a push to `main` occurs.

## To Do after fork/create-from-template

- Go to the repository settings, _Actions secrets_ and create a new _repository secret_ with name `HEROKU_APP_NAME` and the name of the Heroku app in the _value_ field.
- Open `package.json` and modify the name and description of the project. The name must be lowercase and can't contain special chars except `-` and `_`.

There's a very simple example of a Fastify app with tests.

## Local development

To run the application there are two options. In either case, you can stablish a `DEBUG=1` environment variable to see the log (_i.e._ `DEBUG=1 npx nodemon app.js`).

### With Node

- Install the dependencies: `npm install`.
- Run the app in port 8000 with `npx nodemon app.js` or with `PORT=xxxx npx nodemon app.js` to use a specific `xxxx` port.

### With Docker

Run `docker-compose up` to start the app. Also, you can specify the port with the environment variable: `PORT=xxxx docker-compose up`.

## Tests

Again, there are two options. Note that the Node option is naturally faster.

### With Node

- Run the tests with `npm test`.
- Run the linter with `npx eslint . --ext .js,.jsx,.ts,.tsx`

### With Docker

Run the tests and linter with:

```bash
docker-compose run --rm fastify sh -c "NODE_ENV=development npm install && npm test && npx eslint . --ext .js,.jsx,.ts,.tsx"
```

## Docs

The documentation is generated automatically by Fastify (with Swagger). It's available in the server at `/docs`.
