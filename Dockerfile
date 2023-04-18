FROM node:lts-slim

RUN npm install -g npm@9.6.4
RUN npm i -g pnpm@latest

# all files needed for the build
COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

# all folders needed for the build
COPY src src/

# RUN npm ci --omit dev
RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 8080

ENV PORT 8080

CMD ["node", "build"]