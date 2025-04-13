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

# Run the application with host check disabled
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--disable-host-check"] 