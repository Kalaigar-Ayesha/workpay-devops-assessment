# base
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# dev
FROM base AS development
ENV NODE_ENV=development
COPY . .

# build
FROM base AS build
COPY . .
RUN npm run build

# prod
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

# run as node user
USER node

EXPOSE 3000
CMD ["node", "dist/server.js"]
