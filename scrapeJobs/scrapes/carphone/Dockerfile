FROM node:22

WORKDIR /app

COPY package.json /app


RUN npm install


COPY .env /app/.env

COPY carphone_bright.js /app/carphone.js


CMD ["node", "carphone.js"]