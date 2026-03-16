import type { PrismaClient as PrismaClientType } from '../../generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { PrismaClient } = require('../../generated/prisma') as {
  PrismaClient: typeof PrismaClientType
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

type PrismaClientInstance = InstanceType<typeof PrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientInstance
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
