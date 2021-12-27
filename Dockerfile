FROM nginx:alpine
ARG STATIC_DIR
COPY $STATIC_DIR/* /usr/share/nginx/html/

EXPOSE 80
