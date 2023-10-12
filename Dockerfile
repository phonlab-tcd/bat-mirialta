FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY run-server.js ./
COPY dist ./dist

EXPOSE 8001

CMD ["node", "run-server.js"]