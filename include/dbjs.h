#pragma once
#include "quickjs.h"

static int file_size_from_filename(const char * filename);
static char * file_contents_from_filename(const char * filename, int total_bytes);

static JSValue json_from_filename(JSContext *ctx, const char * filename);
