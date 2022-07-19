# Название
Сборщик фронта под битрикс

## Предустановки
- Node.js

## Используемые скрипты
Инициализировать проект (удалит репозиторий сборщика, создаст репозиторий проекта, установит зависимости)  
`$ npm run kit:init`

Запустить проект в режиме разработки  
`$ npm run kit:dev`

Собрать проект  
`$ npm run kit:build`

Проверить стили линтером  
`$ npm run lint:styles`

Проверить скрипты линтером  
`$ npm run lint:scripts`

Пофиксить стили линтером  
`$ npm run fix:styles`

Пофиксить скрипты линтером  
`$ npm run fix:scripts`

## Установленные по умолчанию зависимости
- inputmask
- delegated-events
- lodash
- normalize.css

## Алиасы
- @ - src
- @assets-fonts - src/assets/fonts
- @assets-media - src/assets/media
- @styles - src/styles
- @styles-mixins - src/styles/mixins
- @components - src/components

## Структура
- assets/
    - fonts/
    - media/
- pages/
- styles/
    - mixins/
    - vars.scss
    - sitemap.scss
    - tech.scss
    - fonts.scss
    - layout.scss
    - animations.scss
    - icons.scss
- layouts/
    - mixins/
    - main.pug
- components/
- init.js
- scripts.js
- styles.js

## Примечания
- Подключать scss-файлы в файле /src/styles.js
- Подключать js-модули в файле /src/init.js (требуется для разделения стадий инициализации и исполнения)
- Подключать локальные файлы в шаблонах, используя путь относительно папки pages/
