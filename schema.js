import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
} from 'graphql'
import axios from 'axios'

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        name: { type: GraphQLString },
        details: { type: GraphQLString },
        date_local: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        rocket: { type: RocketType },
    }),
})

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
    }),
})

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios
                    .get('https://api.spacexdata.com/v4/launches')
                    .then((res) => res.data)
                // TODO: Async Await
            },
        },
    },
})

const Schema = new GraphQLSchema({
    query: RootQuery,
})

export default Schema
