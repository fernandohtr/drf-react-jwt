.style-front:
	npm --prefix frontend run format && npm --prefix frontend run lint

.style-back:
	pylint . && black . && isort .

style: .style-front .style-back

.up-front:
	npm --prefix frontend run dev

.up-back:
	./backend/manage.py runserver

up: .up-front .up-back
