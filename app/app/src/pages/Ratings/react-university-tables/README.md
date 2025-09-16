# 🎓 React University Tables

React компонент для отображения списков поступающих университета с поиском и фильтрацией.

## ✨ Возможности

- 🔍 **Поиск в реальном времени** по названиям специальностей и факультетам
- 📱 **Адаптивный дизайн** для всех устройств
- ⚡ **Высокая производительность** с мемоизацией
- 🎨 **Современный UI** с плавными анимациями
- 🔗 **Прямые ссылки** на HTML файлы со списками
- ⚙️ **Настраиваемые параметры**

## 📦 Установка

### Вариант 1: Копирование в проект
```bash
# Скопируйте папку react-university-tables в ваш проект
cp -r react-university-tables/ /path/to/your/project/src/components/
```

### Вариант 2: Как npm пакет (локальный)
```bash
# В вашем проекте
npm install file:./react-university-tables
```

## 🚀 Быстрый старт

### Базовое использование
```jsx
import React from 'react';
import UniversityTables from './components/react-university-tables/src';

function App() {
  return (
    <div className="App">
      <UniversityTables />
    </div>
  );
}

export default App;
```

### С кастомными параметрами
```jsx
import UniversityTables from './components/react-university-tables/src';

function AdmissionPage() {
  return (
    <UniversityTables 
      baseUrl="/public/admission-files/"
      title="Списки поступающих 2025"
      subtitle="Приемная комиссия ВГАУ"
    />
  );
}
```

## ⚙️ Параметры (Props)

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `baseUrl` | string | `'/tables-in-package/'` | Базовый URL к папке с HTML файлами |
| `title` | string | `'Списки поступающих ВГАУ'` | Заголовок компонента |
| `subtitle` | string | `'2025 год'` | Подзаголовок |

## 📁 Структура файлов

```
react-university-tables/
├── src/
│   ├── components/
│   │   ├── UniversityTables.jsx    ← основной компонент
│   │   ├── UniversityTables.css    ← стили
│   │   └── index.js                ← экспорт
│   └── index.js                    ← главный экспорт
├── Example.jsx                     ← примеры использования
├── README.md                       ← документация
└── package.json                    ← конфигурация
```

## 📊 Данные

Компонент содержит информацию о **67 направлениях**:
- **52 специальности** высшего образования
- **15 программ** среднего профессионального образования
- Все **6 факультетов** университета

## 🎨 Кастомизация стилей

### Изменение цветовой схемы
```css
/* Переопределите CSS переменные или классы */
.university-tables-header {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}

.university-table-link {
  background: #your-accent-color;
}
```

### Кастомные размеры карточек
```css
.university-tables-grid {
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}
```

## 📱 Адаптивность

Компонент полностью адаптивен:
- **Desktop**: 3-4 колонки карточек
- **Tablet**: 2 колонки
- **Mobile**: 1 колонка

## 🔍 Функциональность поиска

```jsx
// Поиск работает по:
// - Названию специальности: "агрономия", "экономика"
// - Факультету: "аграрный", "технологический"
// - Частичным совпадениям: "ветер" найдет "Ветеринария"
```

## 🛠 Интеграция в существующие проекты

### Create React App
```jsx
// src/App.js
import UniversityTables from './components/react-university-tables/src';

function App() {
  return (
    <div className="App">
      <UniversityTables baseUrl="/public/tables/" />
    </div>
  );
}
```

### Next.js
```jsx
// pages/admission.js
import dynamic from 'next/dynamic';

const UniversityTables = dynamic(
  () => import('../components/react-university-tables/src'),
  { ssr: false }
);

export default function AdmissionPage() {
  return (
    <main>
      <UniversityTables baseUrl="/static/tables/" />
    </main>
  );
}
```

### Vite
```jsx
// src/components/AdmissionSection.jsx
import UniversityTables from './react-university-tables/src';

export const AdmissionSection = () => {
  return (
    <section>
      <UniversityTables />
    </section>
  );
};
```

## 📦 Подготовка HTML файлов

1. Скопируйте папку `tables-in-package` в папку `public` вашего проекта:
```
public/
└── tables-in-package/
    ├── ff1.html
    ├── ff2.html
    └── ...
```

2. Или разместите файлы на CDN и укажите полный URL:
```jsx
<UniversityTables baseUrl="https://cdn.example.com/tables/" />
```

## 🔧 Требования

- **React**: 16.8+ (для хуков)
- **Браузеры**: Chrome, Firefox, Safari, Edge (современные версии)
- **Node.js**: 12+ (для разработки)

## 🚨 Устранение неполадок

### Карточки не открывают файлы
- Проверьте правильность `baseUrl`
- Убедитесь, что HTML файлы доступны по указанному пути

### Стили не применяются
- Убедитесь, что CSS файл импортируется
- Проверьте конфликты с глобальными стилями

### Компонент не отображается
- Проверьте правильность импорта
- Убедитесь в совместимости версии React

## 📄 Лицензия

MIT License - используйте свободно в любых проектах.

## 🤝 Поддержка

Для вопросов и предложений создавайте issues в репозитории проекта.
