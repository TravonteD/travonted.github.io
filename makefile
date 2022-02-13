build: src/ src/index.html src/style.css src/images/

src/index.html: index.html
	cp $(<) $(@)

src/style.css: style.scss
	sass $(<) $(@)

src/images/:
	cp -r images src/images

%/:
	mkdir -p $(@)

.PHONY: serve
serve: build
	cd src && python -m http.server 8000 --bind=0.0.0.0

clean: src
	rm -rf src
