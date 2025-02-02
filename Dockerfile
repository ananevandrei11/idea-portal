FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY . .
RUN pnpm fetch

COPY . .
RUN pnpm install

RUN apk add --no-cache postgresql-client

CMD ["pnpm", "back" "dev"]
