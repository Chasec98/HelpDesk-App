FROM node:alpine as nodeBuild
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=nodeBuild /usr/app/dist /usr/share/nginx/html