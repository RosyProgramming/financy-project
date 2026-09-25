import 'dotenv/config'
import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  throw new Error('TURSO_DATABASE_URL ou TURSO_AUTH_TOKEN não configurado.')
}

const client = createClient({
  url,
  authToken,
})

await client.execute('PRAGMA foreign_keys = ON')

await client.execute(`
  CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiry" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Category_userId_fkey"
      FOREIGN KEY ("userId")
      REFERENCES "User" ("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" DECIMAL NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_userId_fkey"
      FOREIGN KEY ("userId")
      REFERENCES "User" ("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT "Transaction_categoryId_fkey"
      FOREIGN KEY ("categoryId")
      REFERENCES "Category" ("id")
      ON DELETE RESTRICT
      ON UPDATE CASCADE
  )
`)

await client.execute(`
  CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key"
  ON "User"("email")
`)

await client.execute(`
  CREATE UNIQUE INDEX IF NOT EXISTS "User_resetToken_key"
  ON "User"("resetToken")
`)

await client.execute(`
  CREATE UNIQUE INDEX IF NOT EXISTS "Category_title_userId_key"
  ON "Category"("title", "userId")
`)

console.log('✅ Banco Turso configurado com sucesso!')