FROM node:20-alpine

# Install OpenSSL and libc compatibility layers for Prisma Schema Engine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copy package descriptors first to leverage Docker build cache layers
COPY package*.json ./

# Install packages
RUN npm ci

# Copy Prisma schema definition
COPY prisma ./prisma/

# Generate Prisma Client specifically for the Alpine Linux runtime architecture
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Expose backend API port
EXPOSE 5000

# Start script with migration pushes on startup
CMD ["sh", "-c", "npx prisma db push && npm run dev"]
