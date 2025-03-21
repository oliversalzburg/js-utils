.PHONY: default build clean docs git-hook pretty lint test run

default: build

build: output

clean:
	rm -rf _site coverage dist-area lib node_modules

docs:
	./docs/build.sh

git-hook:
	echo "make pretty" > .git/hooks/pre-commit

pretty: node_modules
	yarn biome check --write --no-errors-on-unmatched
	npm pkg fix

lint: node_modules
	yarn biome check .
	yarn tsc --noEmit

test: node_modules
	yarn tsc
	yarn c8 --reporter html-spa --reporter text mocha


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
