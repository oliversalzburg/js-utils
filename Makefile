.PHONY: default build clean docs git-hook pretty lint test run

default: build

build: dist-area

clean:
	rm -rf _site coverage dist-area lib node_modules

docs:
	@echo No documentation. Read JSDoc.

git-hook:
	echo "make pretty" > .git/hooks/pre-commit

pretty: node_modules
	npm exec -- biome check --write --no-errors-on-unmatched
	npm pkg fix

lint: node_modules
	npm exec -- biome check .
	npm exec -- tsc --noEmit

test: node_modules
	npm exec -- tsc
	node --enable-source-maps --test lib/**/*.test.js


node_modules:
	npm install

dist-area: node_modules
	npm exec -- tsc
	rm -rf dist-area || true
	cp -r lib dist-area
	cp -r node_modules dist-area/
	cp package-lock.json dist-area/
	cp LICENSE dist-area/
	cp README.md dist-area/
	rm dist-area/tsconfig.tsbuildinfo
	rm dist-area/**/*.test.js dist-area/**/*.test.d.ts dist-area/**/*.test.js.map
	sed 's%/lib/%/%g' package.json > dist-area/package.json
