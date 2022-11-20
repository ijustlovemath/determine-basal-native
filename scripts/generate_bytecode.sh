#!/bin/bash
./quickjs/qjsc -c -o include/determine_basal.h build/determine-basal.mjs
./quickjs/qjsc -c -o include/basal_set_temp.h build/basal-set-temp.mjs
