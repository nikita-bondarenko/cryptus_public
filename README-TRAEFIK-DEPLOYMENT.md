# Zero Downtime Deployment с Traefik

Этот проект адаптирован для работы с вашей существующей конфигурацией Traefik и поддерживает zero downtime deployment с использованием blue-green стратегии.

## Структура сервисов

### Основной сервис
- **cryptus-front-2025** - основной сервис, который должен быть виден для Traefik
- Контейнер: `cryptus-front-2025`
- URL: `http://cryptus-front-2025:3000`

### Blue-Green инстансы
- **cryptus-blue** - синий инстанс для deployment
- **cryptus-green** - зеленый инстанс для deployment

## Интеграция с существующим Traefik

Ваш текущий конфиг Traefik уже правильно настроен:

```yaml
cryptus-front-2025_svc:
  loadBalancer:
    servers:
      - url: "http://cryptus-front-2025:3000"
```

Сервис `cryptus-front-2025` будет автоматически переключаться между blue и green инстансами во время deployment.

## Быстрый старт

### 1. Первоначальный запуск
```bash
# Запуск основного сервиса
docker compose -f docker-compose.zero-downtime.yml up -d cryptus-front-2025

# Проверка статуса
./deploy-traefik-zero-downtime.sh status
```

### 2. Zero Downtime Deployment
```bash
# Запуск deployment
./deploy-traefik-zero-downtime.sh deploy

# Проверка результата
./deploy-traefik-zero-downtime.sh status
```

## Команды управления

### Развертывание
```bash
./deploy-traefik-zero-downtime.sh deploy
```

### Проверка статуса
```bash
./deploy-traefik-zero-downtime.sh status
```

### Очистка ресурсов
```bash
./deploy-traefik-zero-downtime.sh cleanup
```

### Справка
```bash
./deploy-traefik-zero-downtime.sh help
```

## Как это работает

1. **Обычное состояние**: Запущен только `cryptus-front-2025`, который служит основным сервисом
2. **Во время deployment**:
   - Запускается новый инстанс (blue или green)
   - Проверяется его здоровье
   - Основной сервис переключается на новый инстанс
   - Старый инстанс останавливается
3. **После deployment**: Снова работает только один сервис

## Health Check

Endpoint для проверки здоровья: `/api/health`

Ответ содержит информацию об активном инстансе:
```json
{
  "status": "healthy",
  "instance": "blue",
  "timestamp": "2025-07-07T11:24:34.383Z",
  "uptime": 35.168994471
}
```

## Мониторинг

Все сервисы поддерживают health checks:
- **HTTP**: `GET /api/health`
- **Docker**: встроенные healthcheck в compose файле
- **Traefik**: автоматические health checks через loadBalancer

## Особенности конфигурации

### Docker Compose
```yaml
cryptus-front-2025:
  container_name: cryptus-front-2025
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.cryptus-front-2025.rule=Host(`cryptus-front-2025.partners-bot.ru`)"
    - "traefik.http.services.cryptus-front-2025.loadbalancer.server.port=3000"
```

### Profiles
Blue и Green инстансы используют profile `blue-green` для изоляции от основного сервиса.

## Безопасность

- Все инстансы изолированы в отдельной Docker сети
- Поддержка HTTPS через Traefik
- Rate limiting через Traefik middlewares
- Security headers автоматически добавляются

## Troubleshooting

### Проверка логов
```bash
# Логи основного сервиса
docker logs cryptus-front-2025

# Логи blue инстанса
docker logs cryptus-blue

# Логи green инстанса
docker logs cryptus-green
```

### Ручное переключение
Если нужно вручную переключиться на определенный инстанс:

```bash
# Запуск blue инстанса
docker compose -f docker-compose.zero-downtime.yml --profile blue-green up -d cryptus-blue

# Остановка основного сервиса
docker compose -f docker-compose.zero-downtime.yml stop cryptus-front-2025

# Переключение (будет выполнено автоматически скриптом)
```

## Совместимость

- ✅ Совместимо с существующим Traefik конфигом
- ✅ Работает с Docker Compose
- ✅ Поддерживает автоматические SSL сертификаты
- ✅ Интегрируется с monitoring (Prometheus, Grafana)

## Следующие шаги

1. Убедитесь, что Traefik правильно настроен и работает
2. Запустите первый deployment
3. Настройте мониторинг и алерты
4. Интегрируйте в CI/CD pipeline 