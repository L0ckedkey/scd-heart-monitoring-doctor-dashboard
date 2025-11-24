# Base image
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
EXPOSE 3000

# Start the Next.js app in production
CMD ["npm", "run", "start"]
