const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query
const shortid = require("shortid")
const dotenv = require("dotenv")
dotenv.config

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly(
      recipientName: String!
      message: String!
      senderName: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!
    ): Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
  Mutation: {
    createLolly: async (_, args) => {
      console.log("args : ", args)

      const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET })
      //generating id
      const id = shortid.generate()
      args.lollyPath = id

      //saving to faunadb data
      const result = await client.query(
        q.Create(q.Collection("lollies"), {
          data: args,
        })
      )

      console.log("result : ", result)
      console.log("result.data : ", result.data)

      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
