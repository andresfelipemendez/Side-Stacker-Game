# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the image
WORKDIR /app

# Copy the package.json and package-lock.json files into the image
COPY package*.json ./

# Install the dependencies
RUN npm -g install nodemon
RUN npm install

# Copy the rest of the application files into the image
COPY . .

# Specify the command to run when the container starts
CMD [ "npm", "run","dev" ]