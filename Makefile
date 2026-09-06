.PHONY: default build clean docs git-hook pretty lint test run

default: build

build: dist-area

clean:
	rm -rf _site coverage dist-area lib node_modules

docs:
	@echo No documentation. Read JSDoc.

git-hook:
	echo "make pretty" > .git/hooks/pre-commit

pretty: node_modules/.package-lock.json
	npm exec -- biome check --write --no-errors-on-unmatched
	npm pkg fix

lint: node_modules/.package-lock.json
	npm exec -- biome check .
	npm exec -- tsc --noEmit

test: node_modules/.package-lock.json
	npm exec -- tsc
	node --test lib/**/*.test.js


package-lock.json: package.json
	npm install --package-lock-only
node_modules/.package-lock.json: package-lock.json
	npm ci

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
