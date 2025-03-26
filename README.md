
```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

query {
  users {
    user_id
    username
    password
  }
}


mutation {
  createUser(createUserInput: {
    password: "tester@gmail.com",    
    username: "tester"
  }) {
    user_id    
    password
    username
  }
}


query {
  user(username: "tester@gmail.com") {
    user_id
    username
   
  }
}

mutation {
  login(username: "tester@gmail.com", password: "tester") {
    access_token
  }
}