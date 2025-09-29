# Use the latest Node.js LTS version (official image)
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies exactly as in package-lock.json
RUN npm ci --only=production

# Copy the rest of your project files
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
