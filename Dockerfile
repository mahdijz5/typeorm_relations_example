FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --force

# Bundle app source
COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "node", "dist/src/main" ]