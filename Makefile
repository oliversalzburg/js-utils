.PHONY: default build clean docs pretty lint test run

default: clean build

build: output

clean:
	rm -rf _site coverage dist-area lib

docs:
	./docs/build.sh

pretty:
	yarn biome check --write --no-errors-on-unmatched

lint:
	yarn biome check .
	yarn tsc --noEmit

test:
	yarn c8 --reporter html-spa --reporter text node $(shell yarn bin mocha) --enable-source-maps

run: clean build
	node ./output/main.js


node_modules:
	yarn install

output: node_modules
	yarn tsc
	rm -rf dist-area || true
	cp -r lib dist-area
	cp -r node_modules dist-area/
	cp yarn.lock dist-area/
	cp LICENSE dist-area/
	cp README.md dist-area/
	rm dist-area/tsconfig.tsbuildinfo
	rm dist-area/**/*.test.js dist-area/**/*.test.d.ts dist-area/**/*.test.js.map
	sed 's%/lib/%/%g' package.json > dist-area/package.json
