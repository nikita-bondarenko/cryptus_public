# Используем официальный Node.js образ как базовый
FROM node:18

WORKDIR /usr/src/app


RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
    
COPY package.json ./

RUN  pnpm install

COPY . .

RUN  pnpm build

# Экспонируем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "run", "start"]
