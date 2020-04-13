FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY dist/apps/pool-client /usr/share/nginx/html
COPY deploy/frontend/nginx/nginx.conf /etc/nginx
