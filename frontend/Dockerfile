# Stage 1: Build the app (temporary container)
FROM node:alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build # Replace with your build command

# Stage 2: Production-ready image (smaller)
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
