FROM node:latest

# Creating app directory
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

COPY package.json .
RUN npm install

CMD ["npm", "start"]