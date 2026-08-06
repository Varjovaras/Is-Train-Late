FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1-alpine
WORKDIR /app
ENV NITRO_PORT=3000 NITRO_HOST=0.0.0.0
COPY --from=build /app/.output ./.output
VOLUME /app/.data
EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]
