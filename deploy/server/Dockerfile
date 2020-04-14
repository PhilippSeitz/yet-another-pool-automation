FROM node:alpine

WORKDIR /usr/src/app
COPY dist/apps/pool-server .

RUN npm ci

EXPOSE 3333

CMD [ "node", "main.js" ]