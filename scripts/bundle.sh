#! /bin/bash
# automatically build the module into one file and place it into the cmake build directory

# protect against common issues
set -eu

function transpile () {
  dest_root="$1"
  src="$2"
  dest_name="$3"

  output="$dest_root/$dest_name"
  npx esbuild --bundle "$src" --format=esm --outfile="$output"

  sed -i 's/Function(\"return this\")()/globalThis/g' $output
  sed -i 's@export default@//export default@g' $output
}

CMAKE_BUILD_DIR="build"
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJ_DIR="$(readlink -f $SCRIPT_DIR/..)"
mkdir -p "$PROJ_DIR/$CMAKE_BUILD_DIR"
cd "$PROJ_DIR/oref0"
output="$PROJ_DIR/$CMAKE_BUILD_DIR/determine-basal.mjs"
transpile "$PROJ_DIR/$CMAKE_BUILD_DIR" "lib/determine-basal/determine-basal.js" "determine-basal.mjs"
transpile "$PROJ_DIR/$CMAKE_BUILD_DIR" "lib/basal-set-temp.js" "basal-set-temp.mjs"

cd $PROJ_DIR
bash scripts/generate_bytecode.sh
