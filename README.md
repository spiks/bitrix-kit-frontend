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

## Алиасы
- @ = "./src"
- @template = "./src/template"
- @apiFront = "./src/template/api-front"
- @styles = "./src/template/styles"
- @modules = "./src/template/modules"
- @utils = "./src/template/utils"
- @components = "./src/template/components"

## Структура src
- assets
    - fonts = файлы шрифтов
    - media = файлы картинок
- pages = файлы страниц
- template
    - api-front = файлы фронт-модулей для битрикса (инициализируются в глобальной области видимости)
    - styles = файлы часто используемых стилей и переменныы
    - modules = файлы глобальных скриптов (конструктор модалок, слайдеров, табов и т.п)
    - layouts = файлы паг-шаблонов
    - meta = файлы мета-элементов (хедер, футер)
    - mixins 
        - pug = файлы паг-миксинов
        - css = файлы sass-миксинов
    - utils = файлы вспомогательных скриптов
    - components = файлы компонетов
