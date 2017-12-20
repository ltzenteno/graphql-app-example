import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} from 'graphql';
import axios from 'axios';

// declare types

// to avoid circular references, we wrap the fields inside a closure (arrow function)
const CompanyType = new GraphQLObjectType({
  name:'Company',
  fields:() => {
    return {
      id:{type:GraphQLInt},
      name:{type:GraphQLString},
      description:{type:GraphQLString},
      users:{
        type:GraphQLList(UserType),
        resolve:(parentValue, args) => {
          return axios.get(`http://0.0.0.0:3000/companies/${parentValue.id}/users`)
            .then(response => response.data);
        }
      }
    };
  }
});

const UserType = new GraphQLObjectType({
  name:'User',
  fields:{
    id:{type:GraphQLInt},
    firstName:{type:GraphQLString},
    age:{type:GraphQLInt},
    company:{
      type:CompanyType,
      resolve:(parentValue, args) => {
        return axios.get(`http://0.0.0.0:3000/companies/${parentValue.companyId}`)
          .then(response => response.data);
      }
    }
  }
});

// declare root query (entry point)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    user:{
      type:UserType,
      args:{
        id:{type:GraphQLInt}
      },
      resolve:(parentValue, args) => {
        return axios.get(`http://0.0.0.0:3000/users/${args.id}`)
          .then(response =>  response.data);
      }
    },
    company:{
      type:CompanyType,
      args:{
        id:{type:GraphQLInt}
      },
      resolve:(parentValue, args) => {
        return axios.get(`http://0.0.0.0:3000/companies/${args.id}`)
          .then(response => response.data);
      }
    }
  }
});

export default new GraphQLSchema({
  query:RootQuery
});
