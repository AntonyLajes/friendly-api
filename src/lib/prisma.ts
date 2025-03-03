import { env } from "@/src";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === "dev" ? ['info', 'query'] : []
})