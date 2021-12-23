FROM node:14-alpine as builder
WORKDIR /build
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM nginx:alpine
COPY --from=builder /build/dist/morpio/* /usr/share/nginx/html/

EXPOSE 80
