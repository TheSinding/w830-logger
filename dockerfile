FROM node:14-alpine
WORKDIR /usr/src/app

COPY dist/ .
COPY package*.json .

RUN npm ci --only=production

ENTRYPOINT [ "node", "index.js" ]