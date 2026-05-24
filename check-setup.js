#!/usr/bin/env node
/**
 * MoolTrue Foods — Setup Verifier
 * Run this after filling in server/.env to check all environment variables are set
 * Usage: node check-setup.js (from project root)
 */

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const REQUIRED_SERVER_ENV = [
  'DATABASE_URL',
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'ADMIN_EMAILS',
]

const REQUIRED_FRONTEND_ENV = [
  'VITE_GOOGLE_CLIENT_ID',
  'VITE_RAZORPAY_KEY_ID',
]

// Parse an .env file into a key→value map
function parseEnv(filePath) {
  if (!existsSync(filePath)) return {}
  const content = readFileSync(filePath, 'utf-8')
  return Object.fromEntries(
    content
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => {
        const [key, ...rest] = line.split('=')
        return [key.trim(), rest.join('=').trim().replace(/^["']|["']$/g, '')]
      })
  )
}

const PLACEHOLDER_VALUES = [
  'your-', 'xxxx', 'replace', 'change', 'postgresql://user:password',
  'your-client-id', 'your-cloud-name', 'your-api-key', 'your-api-secret'
]

function isPlaceholder(val) {
  return !val || PLACEHOLDER_VALUES.some(p => val.toLowerCase().includes(p))
}

console.log('\n🌿 MoolTrue Foods — Setup Verifier\n')

const serverEnv = parseEnv(resolve(__dirname, 'server/.env'))
const frontendEnv = parseEnv(resolve(__dirname, '.env.local'))

let allGood = true

console.log('📋 Checking server/.env ...')
for (const key of REQUIRED_SERVER_ENV) {
  const val = serverEnv[key]
  if (!val || isPlaceholder(val)) {
    console.log(`  ❌ ${key} — not set or still a placeholder`)
    allGood = false
  } else {
    const display = key.includes('SECRET') || key.includes('PASSWORD')
      ? '***hidden***'
      : val.length > 50 ? val.slice(0, 47) + '...' : val
    console.log(`  ✅ ${key} = ${display}`)
  }
}

console.log('\n📋 Checking .env.local ...')
for (const key of REQUIRED_FRONTEND_ENV) {
  const val = frontendEnv[key]
  if (!val || isPlaceholder(val)) {
    console.log(`  ❌ ${key} — not set or still a placeholder`)
    allGood = false
  } else {
    console.log(`  ✅ ${key} = ${val}`)
  }
}

console.log()
if (allGood) {
  console.log('🎉 All environment variables are configured!')
  console.log('\nNext steps:')
  console.log('  1. cd server && npx prisma db push')
  console.log('  2. npm run db:seed')
  console.log('  3. npm run dev  (backend)')
  console.log('  4. cd .. && npm run dev  (frontend)')
  console.log('  5. Visit http://localhost:5173/admin')
} else {
  console.log('⚠️  Some variables are missing. Fill them in and run this script again.')
  console.log('   See the walkthrough.md or SETUP.md for instructions on each service.')
}
console.log()
