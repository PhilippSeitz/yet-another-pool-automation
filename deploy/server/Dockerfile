FROM node:alpine

WORKDIR /usr/src/app
COPY dist/apps/pool-server .
COPY package*.json ./

ENV CYPRESS_INSTALL_BINARY=0
RUN npm ci

EXPOSE 3333

CMD [ "node", "main.js" ]