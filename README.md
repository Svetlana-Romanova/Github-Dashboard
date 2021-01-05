<h2>Github Dashboard</h2>

<a href="https://svetlana-romanova.github.io/github-dashboard/">Demo</a>

Главная страница – список репозиториев с возможностью поиска и страницами. Карточка репозитория – страница с более детальной информацией по репозиторию.

Технологии:

- React
- react-create-app
- react-router
- styled-components

Функциональность:

- при введении текста в Поле для поиска, должен происходить поиск по названию и выводиться его результат в Список репозиториев ниже.
- если в поле ничего не введено, то показывается список 10ти самых популярных репозиториев.
- порядок сортировки репозиториев – по в кол-ву звёзд на github (от большего к меньшему)
- выбранная страница в Paginator должна отличаться по стилю от всех остальных.
- при перезагрузке страницы состояние выбранных фильтров (поиска и страницы) должно сохраняться и использоваться для первоначального запроса.
- сохранять ответ от API на тысячи репозиториев в приложении нельзя, поиск должен происходить на стороне API.
- при клике на название репозитория происходит переход на Карточку репозитория.
