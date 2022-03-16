import "./config.js";
import { resolver } from "./apollo/resolver.js";
import { TypeDef } from "./apollo/schema.js";
import { server } from "./router.js";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { FastifyInstance } from "fastify";

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function startApolloServer(typeDefs: any, resolvers: any) {
  // const app = fastify();
  const appolo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      fastifyAppClosePlugin(server),
      ApolloServerPluginDrainHttpServer({ httpServer: server.server }),
    ],
  });

  await appolo.start();
  server.register(appolo.createHandler());

  await server.listen(process.env.PORT ?? 4000);
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${appolo.graphqlPath}`
  );
}

startApolloServer(TypeDef, resolver);
