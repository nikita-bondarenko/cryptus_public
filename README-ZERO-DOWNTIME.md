# Cryptus Zero Downtime Deployment

Полноценная система развертывания без простоя для приложения Cryptus с использованием Docker Compose, Blue-Green deployment и мониторингом.

## 🚀 Архитектура

### Основные компоненты:

1. **Load Balancer (Nginx)** - Распределение трафика между инстансами
2. **Blue/Green Instances** - Два идентичных контейнера приложения
3. **Redis** - Кэширование и управление сессиями
4. **Monitoring Stack** - Prometheus + Grafana + Exporters

### Схема развертывания:

```
Internet → Nginx (Load Balancer) → Blue Instance (Active)
                                → Green Instance (Standby)
```

## 📁 Структура файлов

```
.
├── docker-compose.zero-downtime.yml    # Основная конфигурация
├── docker-compose.monitoring.yml       # Мониторинг
├── cryptus_2025/
│   ├── Dockerfile.prod                 # Production Dockerfile
│   └── src/app/api/health/route.ts     # Health check endpoint
├── nginx/
│   └── nginx.conf                      # Конфигурация Nginx
├── monitoring/
│   └── prometheus.yml                  # Конфигурация Prometheus
├── deploy-zero-downtime.sh             # Скрипт развертывания
├── cryptus-cluster-manager.sh          # Управление кластером
└── README-ZERO-DOWNTIME.md            # Эта документация
```

## 🛠 Установка и запуск

### Предварительные требования:

- Docker Engine 20.10+
- Docker Compose v2.0+
- curl (для health checks)
- jq (для парсинга JSON)

### Быстрый старт:

```bash
# 1. Дать права на выполнение скриптов
chmod +x deploy-zero-downtime.sh
chmod +x cryptus-cluster-manager.sh

# 2. Запустить весь стек
./cryptus-cluster-manager.sh start

# 3. Проверить статус
./cryptus-cluster-manager.sh status
```

### Доступ к сервисам:

- **Приложение**: http://localhost
- **Grafana**: http://localhost:3001 (admin/cryptus123)
- **Prometheus**: http://localhost:9090
- **cAdvisor**: http://localhost:8080

## 🔄 Zero Downtime Deployment

### Процесс развертывания:

1. **Подготовка**: Новый код собирается в неактивном контейнере
2. **Health Check**: Проверка готовности нового инстанса
3. **Traffic Switch**: Переключение трафика на новый инстанс
4. **Cleanup**: Остановка старого инстанса

### Команды развертывания:

```bash
# Развертывание новой версии
./deploy-zero-downtime.sh deploy

# Откат к предыдущей версии
./deploy-zero-downtime.sh rollback

# Проверка статуса
./deploy-zero-downtime.sh status

# Просмотр логов
./deploy-zero-downtime.sh logs nginx
```

## 📊 Мониторинг

### Метрики Prometheus:

- **Системные метрики**: CPU, память, диск (Node Exporter)
- **Контейнерные метрики**: Ресурсы контейнеров (cAdvisor)
- **Nginx метрики**: Запросы, соединения (Nginx Exporter)
- **Redis метрики**: Производительность Redis (Redis Exporter)
- **Health Check**: Состояние приложения

### Grafana Dashboard:

1. Откройте http://localhost:3001
2. Войдите (admin/cryptus123)
3. Импортируйте готовые дашборды для мониторинга

### Alerting:

- Настройка алертов в Prometheus
- Уведомления через webhook/email
- Автоматический роллбек при критических ошибках

## 🎛 Управление кластером

### Основные команды:

```bash
# Управление стеком
./cryptus-cluster-manager.sh start     # Запуск всего стека
./cryptus-cluster-manager.sh stop      # Остановка
./cryptus-cluster-manager.sh restart   # Перезапуск

# Развертывание
./cryptus-cluster-manager.sh deploy    # Zero downtime deploy
./cryptus-cluster-manager.sh rollback  # Откат
./cryptus-cluster-manager.sh status    # Статус

# Мониторинг
./cryptus-cluster-manager.sh health    # Проверка здоровья
./cryptus-cluster-manager.sh logs nginx true  # Логи с отслеживанием
./cryptus-cluster-manager.sh resources # Ресурсы системы

# Масштабирование
./cryptus-cluster-manager.sh scale cryptus-blue 2

# Резервное копирование
./cryptus-cluster-manager.sh backup    # Создать бэкап
./cryptus-cluster-manager.sh restore ./backups/20231201_120000
```

## 🔧 Конфигурация

### Переменные окружения:

```bash
# В docker-compose.zero-downtime.yml
NODE_ENV=production
PORT=3000
INSTANCE_COLOR=blue|green
```

### Настройка Nginx:

- Rate limiting: 30 req/s для основного трафика, 10 req/s для API
- Health checks каждые 30 секунд
- Gzip сжатие для статических файлов
- Security headers

### Health Check Endpoint:

```typescript
// /api/health возвращает:
{
  "status": "healthy",
  "timestamp": "2023-12-01T12:00:00.000Z",
  "uptime": 123.45,
  "instance": "blue",
  "version": "0.1.0",
  "memory": {
    "used": 45.67,
    "total": 128.00
  }
}
```

## 🚨 Troubleshooting

### Общие проблемы:

#### 1. Контейнер не запускается:
```bash
# Проверить логи
./cryptus-cluster-manager.sh logs cryptus-blue

# Проверить health check
curl http://localhost/api/health
```

#### 2. Nginx не переключает трафик:
```bash
# Проверить конфигурацию Nginx
docker exec cryptus_nginx nginx -T

# Перезагрузить конфигурацию
docker exec cryptus_nginx nginx -s reload
```

#### 3. Мониторинг не работает:
```bash
# Проверить Prometheus targets
curl http://localhost:9090/api/v1/targets

# Перезапустить мониторинг
./cryptus-cluster-manager.sh stop
./cryptus-cluster-manager.sh start
```

### Логи и диагностика:

```bash
# Все логи
./cryptus-cluster-manager.sh logs

# Логи конкретного сервиса
./cryptus-cluster-manager.sh logs nginx true

# Статус контейнеров
docker compose -f docker-compose.zero-downtime.yml ps

# Использование ресурсов
./cryptus-cluster-manager.sh resources
```

## 🔐 Безопасность

### Рекомендации:

1. **Смена паролей**: Измените пароль Grafana по умолчанию
2. **Firewall**: Ограничьте доступ к портам мониторинга
3. **SSL/TLS**: Настройте HTTPS для production
4. **Secrets**: Используйте Docker secrets для sensitive данных

### Настройка SSL:

```bash
# Добавьте SSL сертификаты в nginx/ssl/
# Обновите nginx.conf для HTTPS
```

## 📈 Производительность

### Оптимизация:

1. **Resource Limits**: Настройте limits в docker-compose
2. **Caching**: Используйте Redis для кэширования
3. **CDN**: Подключите CDN для статических файлов
4. **Database**: Оптимизируйте подключения к БД

### Мониторинг производительности:

- Response time в Grafana
- CPU/Memory usage
- Error rate и success rate
- Database connection pool

## 🚀 Production Deployment

### Checklist для production:

- [ ] SSL сертификаты настроены
- [ ] Пароли изменены с defaults
- [ ] Backup стратегия настроена
- [ ] Monitoring alerts настроены
- [ ] Resource limits установлены
- [ ] Log rotation настроен
- [ ] Firewall правила применены

### CI/CD Integration:

```yaml
# GitHub Actions example
- name: Deploy
  run: |
    ./deploy-zero-downtime.sh deploy
    ./cryptus-cluster-manager.sh health
```

## 📚 Дополнительные ресурсы

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Load Balancing](https://nginx.org/en/docs/http/load_balancing.html)
- [Prometheus Configuration](https://prometheus.io/docs/prometheus/latest/configuration/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)

## 🆘 Поддержка

При возникновении проблем:

1. Проверьте логи: `./cryptus-cluster-manager.sh logs`
2. Проверьте health: `./cryptus-cluster-manager.sh health`
3. Проверьте ресурсы: `./cryptus-cluster-manager.sh resources`
4. Создайте backup: `./cryptus-cluster-manager.sh backup`

---

**Важно**: Всегда тестируйте изменения в staging окружении перед production развертыванием! 