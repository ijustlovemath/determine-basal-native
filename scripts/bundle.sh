#! /bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../oref0"
npx esbuild --bundle lib/determine-basal/determine-basal.js --format=esm --outfile=$SCRIPT_DIR/../build/determine-basal.mjs
