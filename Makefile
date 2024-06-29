.style-front:
	npm --prefix frontend run format && npm --prefix frontend run lint

.style-back:
	pylint . && black . && isort .

style: .style-front .style-back
