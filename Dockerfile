# Multi-stage build: build with Node, serve with Nginx
FROM node:18-alpine AS builder
WORKDIR /app
COPY ./redux-version/package.json ./redux-version/package-lock.json* ./redux-version/
COPY ./redux-version/ ./redux-version/
WORKDIR /app/redux-version
RUN npm install --silent
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/redux-version/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://localhost || exit 1
CMD ["nginx", "-g", "daemon off;"]
