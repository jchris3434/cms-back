FROM node:21

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 12000

CMD ["npm", "run", "start:prod"]