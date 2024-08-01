# Stage 1: Build the app (temporary container)
FROM node:alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

# Stage 2: Production-ready image (smaller)
FROM nginx:stable-alpine
COPY ./runtime-config.sh /home/
COPY --from=build /app/build /usr/share/nginx/html

WORKDIR /home
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

RUN chmod +x runtime-config.sh 

EXPOSE 80
CMD ["/bin/sh", "-c", "/home/runtime-config.sh && nginx -g \"daemon off;\""]
