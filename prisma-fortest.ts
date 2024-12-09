import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export function setTestPrisma(newPrisma: PrismaClient) {
  prisma = newPrisma;
}
