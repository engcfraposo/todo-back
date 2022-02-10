import { GraphQLServer } from "graphql-yoga";
import path from "path";
import resolvers from "./resolvers";
import cors from "cors";

require("dotenv").config({path: path.resolve(__dirname, "..",".env")})


const typeDefs = path.resolve(__dirname, "schema","todo.graphql")

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.use(cors())

server.start(() => console.log("Server is running on http://localhost:4000"))