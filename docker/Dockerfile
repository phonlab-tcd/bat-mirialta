FROM node:18-alpine

WORKDIR /usr/src/app

# RUN rm -rf ./dist

COPY package*.json ./

RUN npm install

COPY run-server.js ./
COPY dist ./dist

CMD ["node", "run-server.js"]