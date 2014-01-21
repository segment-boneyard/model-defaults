build: node_modules components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr node_modules build components

node_modules:
	@npm install

test: build
	@component test phantom

.PHONY: clean test
