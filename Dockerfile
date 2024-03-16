# Use an official Node.js runtime as the base image
FROM node:20-alpine3.18




COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's code to the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 5173

# Define the command to run your app
CMD ["ls"]
