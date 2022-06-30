# Название
Сборщик фронта под битрикс

## Предустановки
- Node.js

## Используемые скрипты
Установить зависиомсти
`$ npm ci`

Запустить фронт в режиме разработки (http://localhost:8080)  
`$ npm run dev`
 
Собрать фронт  
`$ npm run build`

## Установленные по умолчанию зависимости
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
- init.js 
- scripts.js
- styles.js
