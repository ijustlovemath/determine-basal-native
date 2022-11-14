#! /bin/bash
# automatically build the module into one file and place it into the cmake build directory

# protect against common issues
set -eu

CMAKE_BUILD_DIR="build"
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJ_DIR="$(readlink -f $SCRIPT_DIR/..)"
mkdir -p "$PROJ_DIR/$CMAKE_BUILD_DIR"
cd "$PROJ_DIR/oref0"
output="$PROJ_DIR/$CMAKE_BUILD_DIR/determine-basal.mjs"
npx esbuild --bundle lib/determine-basal/determine-basal.js --format=esm --outfile=$output
sed -i 's/Function(\"return this\")()/globalThis/g' $output
sed -i 's@export default@//export default@g' $output
cd $PROJ_DIR
bash scripts/generate_bytecode.sh
