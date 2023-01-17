import fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

app.register(cors);

const PORT = 3333;

app.get('/hello', async (request, reply) => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
