import cors from "@fastify/cors";
import Fastify from "fastify";
import { PORT } from "./config/general";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
