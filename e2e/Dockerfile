FROM cypress/base:ubuntu18-node12.14.1
WORKDIR /opt
COPY package.json package.json
RUN yarn install
COPY . .
ENTRYPOINT make all slack