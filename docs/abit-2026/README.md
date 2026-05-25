# Обновления абитуриента (май 2026)

## Уже применено на production (через REST API)

- Карточки факультетов: СПО → «Факультет СПО», VK `vk.com/abitvsau` для центра и СПО, удалены подписи WhatsApp/Telegram в телефонах.
- React: контакты, страница `/enrollment`, фильтр телефонов в списке факультетов.

## После деплоя темы на сервер

1. Задеплоить тему с обновлёнными `api/api.php`, `api/menus.php`, `api/faculties.php` и собранным `app/index.js`.
2. Запустить:

```bash
python3 scripts/update-wp-content.py
python3 scripts/update-faculties.sh   # при необходимости повторно
```

## Файлы для загрузки в WordPress

Положите файлы в эту папку и обновите URL в админке или в скриптах:

| Файл | Куда |
|------|------|
| Excel программ обучения | TablePress, таблица #57 |
| Буклеты (4 PDF) | Медиатека → URL в `ForWidgets.tsx` |
| Образец договора | CPT `admission`, запись «Образец договора…» |
| СПО: правила, перечень, требования | Пост 42546 |
| Стоимость обучения | Пост 42526 |
| Презентация иностранцев | `wp-content/uploads/2026/05/Bachelor-Programs-and-Masters-degree-Programs.pdf` |

Подготовленный HTML для постов/страниц: [`wp-content-updated/`](wp-content-updated/).
