FROM node:alpine

WORKDIR /usr/src/app
COPY dist/apps/pool-temp .

RUN apk add --update-cache \
    python \
    python-dev \
    g++ \
    make

RUN npm ci

EXPOSE 3333

CMD [ "node", "main.js" ]