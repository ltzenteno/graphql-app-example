import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from 'graphql';
import {users} from './../util/users';
import _ from 'lodash';

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
        return _.find(users, {id:args.id})
      }
    }
  }
});

export default new GraphQLSchema({
  query:RootQuery
});
