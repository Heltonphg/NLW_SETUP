import cors from "@fastify/cors";
import fastify from "fastify";
import { PORT } from "./config/general";
import { appRoutes } from "./routes";

const app = fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
