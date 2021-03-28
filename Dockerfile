FROM node

WORKDIR /src/app

COPY . .

RUN npm install 

CMD ["node","server.js"]