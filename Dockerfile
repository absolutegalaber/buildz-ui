FROM nginx:latest

ENV BUILDZ_API=buildz-api

ADD dist/buildz-ui /usr/share/nginx/buildz-ui
ADD default.conf.template /etc/nginx/templates/default.conf.template

