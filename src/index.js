const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Bid = require('./resolvers/Bid')
const Bird = require('./resolvers/Bird')
const Auction = require('./resolvers/Auction')
const User = require('./resolvers/User')
const Comment = require('./resolvers/Comment')
const BirdParent = require('./resolvers/BirdParent')
const BreedingRecord = require('./resolvers/BreedingRecord')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Bid,
    Bird,
    Auction,
    User,
    Comment,
    BirdParent,
    BreedingRecord,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
          ...request,
          prisma,
        }
    },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))