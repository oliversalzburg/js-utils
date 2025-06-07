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
	npm exec -- biome check --write --no-errors-on-unmatched
	npm pkg fix

lint: node_modules
	npm exec -- biome check .
	npm exec -- tsc --noEmit

test: node_modules
	npm exec -- tsc
	npm exec -- c8 --reporter html-spa --reporter text mocha


node_modules:
	npm install

output: node_modules
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
