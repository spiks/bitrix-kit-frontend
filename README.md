# Название
Сборщик фронта под битрикс

## Предустановки
- Node.js

## Используемые скрипты
Установить зависимости  
`$ npm ci`

Запустить фронт в режиме разработки  
`$ npm run bundler:dev`
 
Собрать фронт  
`$ npm run bundler:build`

Проверить стили линтером  
`$ npm run lint:styles`

Проверить скрипты линтером  
`$ npm run lint:scripts`

Пофиксить стили линтером  
`$ npm run fix:styles`

Пофиксить скрипты линтером  
`$ npm run fix:scripts`

## Установленные по умолчанию зависимости
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
    - fonts.scss
    - layout.scss
    - animations.scss
    - icons.scss
- layouts/
    - mixins/
    - main.pug
- components/
    - header/
        - template.pug
        - styles.scss
        - scripts.js
    - ...
- init.js 
- scripts.js
- styles.js
