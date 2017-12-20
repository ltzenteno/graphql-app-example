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
