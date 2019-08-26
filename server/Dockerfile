FROM node:10.16.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
