FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

# Run Vite dev server bound to 0.0.0.0 so it is accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]
