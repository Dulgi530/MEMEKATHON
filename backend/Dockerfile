FROM node:20-alpine

WORKDIR /app

# Install deps first for better caching
COPY package.json package-lock.json* ./
RUN npm install --production --no-audit --prefer-online

# Copy app source
COPY . .

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["node", "src/index.js"]

