import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from 'graphql';
import axios from 'axios';

// declare types

const UserType = new GraphQLObjectType({
  name:'User',
  fields:{
    id:{type:GraphQLInt},
    firstName:{type:GraphQLString},
    age:{type:GraphQLInt}
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
    }
  }
});

export default new GraphQLSchema({
  query:RootQuery
});
