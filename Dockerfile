# Stage 1: Build the Next.js app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the Next.js app with Nginx
FROM nginx:alpine

# Copy the Next.js build output to Nginx's html directory
COPY --from=build /app/.next /usr/share/nginx/html
COPY --from=build /app/public /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 80

# Command to start Nginx server
CMD ["nginx", "-g", "daemon off;"]
