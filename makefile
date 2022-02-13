build: style.css

style.css: style.scss
	sass $(<) $(@)

.PHONY: serve
serve: build
	python -m http.server 8000 --bind=0.0.0.0

clean: style.css
	rm -rf style.css
