FROM node:20-alpine

WORKDIR /hexagonal-architecture

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Asegúrate de que el archivo main.js esté en la ruta correcta
EXPOSE 4002

CMD ["node", "dist/main.js"]
