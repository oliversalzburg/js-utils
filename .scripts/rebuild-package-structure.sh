#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then
  set -o xtrace
fi

cd "$(dirname "$0")"

main() {
  cd ..
  
  rm -rf dist-area || true
  cp -r lib dist-area
  cp -r node_modules dist-area/
  cp yarn.lock dist-area/
  cp LICENSE dist-area/
  cp README.md dist-area/
  rm dist-area/tsconfig.tsbuildinfo
  sed 's%/lib/%/%g' package.json > dist-area/package.json
}

main "$@"
