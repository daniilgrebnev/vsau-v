# 🚀 Быстрый старт - React University Tables

## 📋 За 3 минуты до запуска

### 1️⃣ Копирование в проект (30 сек)
```bash
# Скопируйте папку в ваш React проект
cp -r react-university-tables/ /path/to/your-project/src/components/
```

### 2️⃣ Подготовка файлов (1 мин)
```bash
# Скопируйте HTML файлы в public
cp -r tables-in-package/ /path/to/your-project/public/
```

### 3️⃣ Использование в коде (1 мин)
```jsx
// src/App.js
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

### 4️⃣ Запуск проекта (30 сек)
```bash
npm start
# или
yarn start
```

## ✅ Готово!
Теперь у вас есть полнофункциональный компонент с:
- 67 карточками направлений
- Поиском в реальном времени
- Адаптивным дизайном

## 🔧 Быстрые настройки

### Изменить путь к файлам:
```jsx
<UniversityTables baseUrl="/assets/tables/" />
```

### Изменить заголовки:
```jsx
<UniversityTables 
  title="Приемная комиссия 2025" 
  subtitle="ВГАУ имени Петра I"
/>
```

### Кастомный обработчик клика:
```jsx
<UniversityTables 
  onTableClick={(table) => {
    console.log('Открыт:', table.name);
    // ваша логика
  }}
/>
```

## 🎯 Структура проекта после установки
```
your-project/
├── public/
│   └── tables-in-package/     ← HTML файлы здесь
├── src/
│   ├── components/
│   │   └── react-university-tables/  ← компонент здесь
│   └── App.js                 ← импорт компонента
```

## 📱 Что получите
- **Поиск**: "агрономия", "ветеринария", "экономика"
- **Клик**: открывает HTML файл в новой вкладке  
- **Адаптив**: работает на телефонах и планшетах
- **67 направлений**: все специальности ВГАУ

## 🆘 Если что-то не работает

### Карточки пустые?
Проверьте путь: `public/tables-in-package/ff1.html` должен существовать

### Не открываются ссылки?
Проверьте baseUrl: по умолчанию `/tables-in-package/`

### Стили не применяются?
Убедитесь что импортируется CSS: `import './UniversityTables.css'`

**Все работает из коробки! 🎉**
