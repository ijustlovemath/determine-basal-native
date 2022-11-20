#!/bin/bash
set -eu
export PROJ_DIR="$1"
cmd="$PROJ_DIR/scripts/bundle.sh"
sudo -u jer bash -c $cmd
