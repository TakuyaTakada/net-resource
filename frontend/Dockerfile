FROM taktakty/ubuntu:18.04-homebrew AS cert-builder
WORKDIR /opt
ARG server_name="localhost"
RUN /home/linuxbrew/.linuxbrew/bin/brew install mkcert
RUN /home/linuxbrew/.linuxbrew/bin/mkcert --install
RUN sudo /home/linuxbrew/.linuxbrew/bin/mkcert ${server_name}

FROM node:12.10.0-alpine AS builder
WORKDIR /opt
COPY package.json package.json
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.17.8-alpine
COPY --from=builder /opt/build /usr/share/nginx/html
COPY --from=cert-builder /opt /etc/nginx/ssl
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]