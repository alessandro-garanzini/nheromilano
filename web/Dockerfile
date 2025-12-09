# Development Dockerfile with hot reload
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Start development server with hot reload
CMD ["npm", "run", "dev"]
