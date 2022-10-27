#! /bin/bash
# automatically build the module into one file and place it into the cmake build directory
CMAKE_BUILD_DIR="build"
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../oref0"
npx esbuild --bundle lib/determine-basal/determine-basal.js --format=esm --outfile=$SCRIPT_DIR/../$CMAKE_BUILD_DIR/determine-basal.mjs
