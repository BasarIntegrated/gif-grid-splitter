# Use the official Node.js 20 image
FROM node:20 

# Install build dependencies and libraries for Image manipulation
RUN apt-get update && apt-get install -y --no-install-recommends \
    pkg-config \
    libcairo2-dev \
    libpango1.0-dev \
    libpng-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Install ImageMagick
RUN apt-get update && apt-get install -y --no-install-recommends \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application
COPY . .

RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application and run the worker script
CMD ["sh", "-c", "npm run dev"]
