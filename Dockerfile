FROM node:18-apline
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm run start"]