# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/app

# # copy the package.json files from local machine to the workdir in container
# COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .
COPY ../frontend .

# EXPOSE 8080

# the command that starts our app
CMD ["node", "./src/index.js"]