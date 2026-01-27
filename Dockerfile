FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 4200

# Use http-server to serve the built files (no watch mode)
RUN npm install -g http-server
CMD ["http-server", "dist/portfolio-app/browser", "-p", "4200", "-f", "index.html"] 