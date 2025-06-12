# Todo App Frontend

Современное приложение для управления задачами, построенное на Next.js и TypeScript. Приложение
позволяет пользователям создавать проекты и управлять задачами через Telegram Mini App.

## 🚀 Возможности

- **Управление проектами**: Создание, просмотр и управление проектами
- **Управление задачами**: Создание задач с приоритетами, отметка о выполнении
- **Мгновенные обновления**: Мгновенное обновление при создании или выполнении задач
- **Адаптивный дизайн**: Работает одинаково хорошо на компьютере и мобильных устройствах
- **Интеграция с Telegram**: Полноценная интеграция через Telegram Mini App
- **Нативный UI**: Использование нативных компонентов Telegram для лучшего UX

## 🛠 Технологии

- **Фреймворк**: [Next.js 15](https://nextjs.org/)
- **Язык**: [TypeScript](https://www.typescriptlang.org/)
- **Стили**: [Tailwind CSS](https://tailwindcss.com/)
- **Анимации**: [Framer Motion](https://www.framer.com/motion/)
- **Управление состоянием**: [TanStack Query](https://tanstack.com/query)
- **Работа с формами**: [React Hook Form](https://react-hook-form.com/)
- **HTTP клиент**: [Axios](https://axios-http.com/)
- **Telegram Mini App**: [@twa-dev/sdk](https://github.com/twa-dev/sdk)

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/todo-telegram-frontend.git
cd todo-telegram-frontend
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env.local` в корневой директории и добавьте следующие переменные:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

4. Запустите сервер разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

## 🏗 Структура проекта

```
src/
├── api/                   # API клиенты и конфигурация
├── app/                   # Next.js роутинг и страницы
│   ├── projects/         # Страницы проектов
│   └── globals.css      # Глобальные стили
├── components/           # React компоненты
│   ├── project/         # Компоненты для проектов
│   ├── task/           # Компоненты для задач
│   └── ui/             # Общие UI компоненты
├── config/              # Конфигурация приложения
├── constants/           # Константы приложения
├── hooks/               # React хуки
├── providers/           # React провайдеры
│   └── TelegramProvider.tsx  # Провайдер для Telegram Mini App
├── services/            # Сервисы для работы с API
├── shared/              # Общие утилиты
└── types/               # TypeScript типы
```

## 📝 Скрипты

- `npm run dev` - Запуск сервера разработки
- `npm run build` - Сборка продакшн версии
- `npm run start` - Запуск продакшн сервера
- `npm run lint` - Проверка кода ESLint
- `npm run format` - Форматирование кода Prettier

## 🌐 Интеграция с Telegram

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота и добавьте его в `.env.local`
3. В настройках бота включите Web App и укажите URL вашего приложения
4. Добавьте команду для открытия Mini App в вашем боте

## 🤝 Как внести свой вклад

1. Сделайте форк репозитория
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'feat: добавить новую функцию'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

## 📄 Лицензия

MIT
