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
  npm exec -- typedoc --customFooterHtml "Updated <code>$(date)</code>"
  cp docs/media/favicon.ico _site/favicon.ico
}

main "$@"
