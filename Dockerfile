#https://www.andretw.com/2022/09/how-we-did-to-reduce-95-bundle-size-of-nuxt3.html
FROM node:16.17.0 AS base
#### multi-stage: builder
FROM base AS builder
RUN mkdir -p /src
COPY . /src
WORKDIR /src
# config/.env should be mounted or replace with config/.env.example
# RUN ["cp", "./.env", "/src/.env"]
RUN yarn install
RUN yarn build
#### multi-stage: runner
FROM node:16.17.0-alpine3.16
WORKDIR /app
COPY --from=builder /src/.output /app/.output
COPY --from=builder /src/nuxt.config.ts /app/
# COPY --from=builder /src/public /app/
# COPY --from=builder /src/config /app/
COPY --from=builder /src/.env /app/
EXPOSE 3000
CMD source .env ; node /app/.output/server/index.mjs

# FROM node:16-alpine
# # Installing libvips-dev for sharp Compatability

# RUN mkdir -p /usr/src/nuxt-app
# WORKDIR /usr/src/nuxt-app

# COPY . .

# RUN npm ci

# RUN npm run build --standalone
# RUN rm -rf node_modules && npm cache clean --force
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_HOST=3000

# EXPOSE 3000

# ENTRYPOINT ["node", ".output/server/index.mjs"]