# Cryptus Mock Backend

Настроенный Mock Service Worker (MSW) для тестирования фронтенда без реального бэкенда.

## 🚀 Быстрый старт

### Запуск с моками
```bash
pnpm run dev:mock
```

Или обычный запуск (моки включаются автоматически в development):
```bash
pnpm run dev
```

## 📁 Структура моков

```
src/mocks/
├── browser.ts      # Настройка для браузера
├── server.ts       # Настройка для Node.js/тестов
├── handlers.ts     # Все API обработчики
├── index.ts        # Экспорты и утилиты
└── types.ts        # TypeScript типы
```

## 🔧 Настройка

### Автоматическая активация
Моки автоматически активируются в development режиме. Service worker будет запущен и будет перехватывать все запросы к API.

### Ручная активация в компоненте
```tsx
import { MSWProvider } from '@/components/MSWProvider';

function App() {
  return (
    <MSWProvider>
      {/* Ваше приложение */}
    </MSWProvider>
  );
}
```

## 📡 Доступные API эндпоинты

### Health Check
- `GET /api/health` - Проверка состояния API

### Пользователь
- `GET /api/user/profile` - Профиль пользователя
- `POST /api/auth/telegram` - Авторизация через Telegram

### Обмен валют
- `GET /api/exchange/rates` - Курсы валют
- `POST /api/exchange/create` - Создание заявки на обмен
- `GET /api/exchange/:id` - Детали обмена

### Валюты
- `GET /api/currencies/bank` - Банковские валюты
- `GET /api/currencies/cash` - Наличные валюты
- `GET /api/currencies/coin` - Криптовалюты

### FAQ
- `GET /api/faq` - Часто задаваемые вопросы

### Поддержка
- `POST /api/support/call` - Заказать звонок
- `POST /api/support/message` - Отправить сообщение

## 🔨 Кастомизация моков

### Изменение данных
Отредактируйте файл `src/mocks/handlers.ts`:

```typescript
http.get('/api/user/profile', () => {
  return HttpResponse.json({
    user_data: {
      id: 12345,
      username: 'your_username',
      // ... ваши данные
    }
  });
});
```

### Добавление новых эндпоинтов
```typescript
// В src/mocks/handlers.ts
http.get('/api/new-endpoint', () => {
  return HttpResponse.json({ message: 'Hello from new endpoint!' });
}),
```

## 🎯 Примеры использования

### Проверка работы моков
Откройте DevTools → Network, выполните запрос к API и увидите:
- Запросы перехватываются MSW
- Возвращаются мокированные данные
- В консоли появляется лог MSW

### Тестирование разных сценариев
Моки включают обработку ошибок:
- `GET /api/error/500` - Ошибка сервера
- `GET /api/error/404` - Ресурс не найден

## 📋 Полезные команды

```bash
# Запуск с моками
pnpm run dev:mock

# Инициализация MSW (если нужно переустановить)
pnpm run msw:init

# Обычная разработка
pnpm run dev
```

## 🐛 Отладка

1. **Моки не работают?**
   - Проверьте консоль браузера на наличие логов MSW
   - Убедитесь, что `NODE_ENV=development`

2. **Service Worker не найден?**
   - Запустите `pnpm run msw:init`

3. **Запросы проходят мимо моков?**
   - Проверьте URLs в handlers.ts
   - Убедитесь, что запросы соответствуют маскам

## 🔄 Переключение между моками и реальным API

```typescript
// В вашем компоненте
const API_BASE = process.env.NEXT_PUBLIC_USE_MOCKS 
  ? 'http://localhost:3000' 
  : 'https://real-api.example.com';
```

Готово! Теперь вы можете разрабатывать фронтенд с полностью функциональным мок-бэкендом. 🎉
