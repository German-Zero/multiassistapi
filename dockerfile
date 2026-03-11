# ---------- build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

RUN npm install

COPY . .

RUN npx nx build multiassistapi

# ---------- runtime ----------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/multiassistapi ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
