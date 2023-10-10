FROM node:14-alpine

WORKDIR /cuongdomanh/app-blog

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

CMD ["npm", "start"]