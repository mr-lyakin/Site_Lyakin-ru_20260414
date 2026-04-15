# Этап 1: Установка зависимостей
# Берём Node.js 20 (лёгкая версия на базе Alpine Linux)
FROM node:20-alpine AS deps

# Устанавливаем рабочую папку внутри контейнера
WORKDIR /app

# Копируем файлы со списком зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости (ci = чистая установка)
RUN npm ci


# Этап 2: Сборка сайта
FROM node:20-alpine AS builder
WORKDIR /app

# Берём зависимости из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules

# Копируем весь исходный код
COPY . .

# Собираем продакшн-версию сайта
RUN npm run build


# Этап 3: Запуск
FROM node:20-alpine AS runner
WORKDIR /app

# Указываем что это продакшн
ENV NODE_ENV=production

# Копируем только то, что нужно для работы
# (не весь исходный код, а только собранный сайт)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Открываем порт 3000
EXPOSE 3000

# Запускаем сервер
CMD ["node", "server.js"]