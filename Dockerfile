FROM node:20-alpine

WORKDIR /hexagonal-architecture

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4002

CMD [ "npm", "run" , "start:prod" ]

