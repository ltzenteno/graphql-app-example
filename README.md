json server : `http:0.0.0.0:3000`
graphiql : `http:0.0.0.0:4000/graphql`

GraphQL queries:
```
query findCompanies{
  first: company(id:1){
		id,
    name,
    description,
    users {
    	firstName,
      age
    }
  },
  second: company(id:2){
    name,
    users{
      firstName
    }
  }
}

```
### Fragments
Query Fragment: a list of different properties we want to get access to.

```
fragment companyDetails on Company {
  id,
  name,
  description
}

query findCompanies{
  first: company(id:1){
    ...companyDetails,
    users {
    	firstName,
      age
    }
  },
  second: company(id:2){
    ...companyDetails,
    users{
      firstName
    }
  }
}
```

### Mutation
- add
```
mutation {
  addUser(firstName:"Luis", age:34, companyId: 2){
    id,
    firstName,
    age
  }
}
```

- delete
```
mutation {
  deleteUser(id:41){
    firstName
  }
}
```

- edit
```
mutation {
  editUser(
    id:48,
    firstName:"Luis Alberto",
    companyId:1
  ){
    id,
    firstName,
    age,
    company{
      name,
      description
    }
  }
}
```
