# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (using npm install instead of npm ci)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Runtime stage using Nginx to serve the static files
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Create custom nginx config to listen on port 4200
RUN echo 'server { \
    listen 4200; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 4200
EXPOSE 4200

# When the container starts, nginx will run
CMD ["nginx", "-g", "daemon off;"]