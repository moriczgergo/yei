FROM node:boron

WORKDIR /usr/src/yei

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]