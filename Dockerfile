FROM node:20.17.0

WORKDIR /app

RUN apt-get update && \
  apt-get install -y \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libdrm2 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libcairo2 \
  libatspi2.0-0 \
  libcups2 && \
  apt-get update && \
  apt-get install -y chromium && \
  rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

# Set environment variable for Chromium path
ENV BROWSER_PATH_EXECUTABLE=/usr/bin/chromium

RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
