import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export let db = globalForPrisma.prisma ?? createPrismaClient();

export function setTestPrisma(newPrisma: PrismaClient) {
  globalForPrisma.prisma = newPrisma;
  db = globalForPrisma.prisma;
}

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
