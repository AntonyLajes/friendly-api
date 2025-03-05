import { randomUUID } from "node:crypto"
import { Environment } from "vitest/environments"
import 'dotenv/config'
import { execSync } from "node:child_process"
import { prisma } from "@/lib/prisma"

function generateDatabaseUrl(schema: string) {

    if(!process.env.DATABASE_URL){
        throw new Error('DATABASE_URL is not set')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment> {
    name: 'prisma',
    transformMode: 'ssr',
    async setup(){

        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)

        process.env.DATABASE_URL = databaseUrl
        execSync('npx prisma generate deploy')

        return {
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`)
            }
        }
    }
}