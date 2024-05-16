# Use an official Node.js runtime as a parent image
FROM node:18.17.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any needed packages
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable for the API URL (will be overridden by Railway)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build production build
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
