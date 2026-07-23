FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Generate prisma client right before running, since we need env vars
CMD ["sh", "-c", "npx prisma generate && until npx prisma migrate deploy; do echo 'Waiting for database...'; sleep 2; done && node prisma/seed.js && node index.js"]