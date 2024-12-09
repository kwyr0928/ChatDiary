import { PrismaClient } from "@prisma/client";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import "@testing-library/jest-dom";
import { execSync } from "child_process";
import { afterAll, beforeAll } from "vitest";
import { setTestPrisma } from "./prisma-fortest";

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

export async function setupTestDBContainer() {
  // testcontainersを使用してPostgreSQLコンテナを起動
  container = await new PostgreSqlContainer("public.ecr.aws/docker/library/postgres:16.1-alpine")
    .withDatabase("diary_db")
    .withUsername("diaryuser")
    .withPassword("password")
    .withReuse()
    .start();

  const port = container.getMappedPort(5432);
  
  // データベースURLを環境変数に設定
  process.env.DATABASE_URL = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${port}/diary_db?schema=public`;

  // Prismaマイグレーションを実行
  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  // 新しいPrismaインスタンスを作成
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  // マイグレーション済みのPrismaインスタンスをセット
  setTestPrisma(prisma);
}

beforeAll(async () => {
  console.log("Start Global setup");
  await setupTestDBContainer();
  console.log("End Global setup");
});

afterAll(async () => {
  console.log("Start Global teardown");
  await prisma.$disconnect();
  await container.stop();
  console.log("End Global teardown");
});
