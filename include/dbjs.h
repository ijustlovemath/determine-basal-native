#pragma once
#include "quickjs.h"

static int file_size_from_filename(const char * filename);
static char * file_contents_from_filename(const char * filename, int total_bytes);

static JSValue json_from_filename(JSContext *ctx, const char * filename);

extern void print_json(JSContext *ctx, const char * filename);
extern JSContext * easy_context(void);
extern void determine_basal(int argc, char *argv[]);
extern void determine_basal2(int argc, char *argv[]);
extern void determine_basal3(int argc, char *argv[]);
