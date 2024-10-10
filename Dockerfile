FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# sudo docker build -t api-c13:latest .

# sudo docker run -p 3000:3000 api-c13
