#! /bin/bash
# automatically build the module into one file and place it into the cmake build directory

# protect against common issues
set -eu
source $HOME/.nvm/nvm.sh

function transpile () {
  dest_root="$1"
  src="$2"
  dest_name="$3"

  echo "transpiling $src to $dest_root/$dest_name"

  output="$dest_root/$dest_name"
  echo npx esbuild --bundle "$src" --format=esm --outfile="$output"
  npx esbuild --bundle "$src" --format=esm --outfile="$output"

  sed -i 's/Function(\"return this\")()/globalThis/g' $output
  sed -i 's@export default@//export default@g' $output

}

CMAKE_BUILD_DIR="build"
#SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
#SCRIPT_DIR=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)/$(basename -- "$0")")
SCRIPT_DIR=$(readlink -f $0)
echo script dir = $SCRIPT_DIR
PROJ_DIR="$(dirname $(dirname $SCRIPT_DIR))"
if [ ! -d "$PROJ_DIR/oref0" ]; then
    echo "failed to find oref0 in $PROJ_DIR"
    exit 1
fi
mkdir -p "$PROJ_DIR/$CMAKE_BUILD_DIR"
cd "$PROJ_DIR/oref0"
transpile "$PROJ_DIR/$CMAKE_BUILD_DIR" "lib/determine-basal/determine-basal.js" "determine-basal.mjs"
transpile "$PROJ_DIR/$CMAKE_BUILD_DIR" "lib/basal-set-temp.js" "basal-set-temp.mjs"

cd $PROJ_DIR
bash scripts/generate_bytecode.sh
