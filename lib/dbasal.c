#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

#include "quickjs.h"


int file_size_from_filename(const char *filename)
{

    if(access(filename, F_OK) == -1) {
        fprintf(stderr, "%s not found\n", filename);
        return -1;
    }

    struct stat fstat;
    if(stat(filename, &fstat)) {
        fprintf(stderr, "failed to stat %s: %s\n", filename, strerror(errno));
        return -1;
    }

    return fstat.st_size;
}

char *file_contents_from_filename(const char *filename, int total_bytes)
{
    if(total_bytes < 0) {
        return NULL;
    }

    FILE *fp = fopen(filename, "r");
    if(fp == NULL) {
        fprintf(stderr, "couldnt open %s: %s\n", filename, strerror(errno));
        return NULL;
    }

    char *content = calloc(total_bytes + 1, 1); // Always leave a trailing NULL
    if(content == NULL) {
        perror("out of memory");
        return NULL;
    }

    int bytes_read = fread(content, 1, total_bytes, fp);
    if(fclose(fp) == EOF) {
        fprintf(stderr, "failed to close %s: %s\n", filename, strerror(errno));
        goto cleanup_content_fail;
    }

    if(bytes_read != total_bytes) {
        fprintf(stderr, "Expected %d bytes but only got %d", total_bytes, bytes_read);
        goto cleanup_content_fail;
    }

    return content;

cleanup_content_fail:
    free(content);
    return NULL;

}

JSValue json_from_filename(JSContext *ctx, const char *filename)
{
    
    int total_bytes = file_size_from_filename(filename);
    char *contents = file_contents_from_filename(filename, total_bytes);
    if(contents == NULL) {
        return JS_UNDEFINED;
    }
    JSValue result = JS_ParseJSON(ctx, contents, total_bytes, filename);
    return result;

}

void print_json(JSContext *ctx, const char *filename)
{
    puts(JS_ToCString(ctx, json_from_filename(ctx, filename)));
}

void determine_basal(void) {
    const char *dbjs = "./oref0/lib/determine_basal.js";

    int js_bytes = file_size_from_filename(dbjs);
    if(js_bytes < 0) {
        return;
    }

    if(js_bytes == 0) {
        puts("dbjs is empty!");
        return;
    }

    FILE *js_file = fopen(dbjs, "r");
    if(js_file == NULL) {
        perror("couldnt open djbs");
        return;
    }

    // TODO: unique_ptr this
    char *js_content = malloc(js_bytes);
    if(js_content == NULL) {
        perror("out of memory");
        return;
    }

    int bytes_read = fread(js_content, 1, js_bytes, js_file);
    if(fclose(js_file) == EOF) {
        perror("failed to close dbjs file");
        goto cleanup_content_fail;
    }

    if(bytes_read != js_bytes) {
        fprintf(stderr, "Expected %d bytes but only got %d", js_bytes, bytes_read);
        goto cleanup_content_fail;
    }

    /* now that we have the file, setup the interpreter */
    JSRuntime *runtime = JS_NewRuntime();
    if(runtime == NULL) {
        puts("unable to create JS Runtime");
        goto cleanup_content_fail;
    }

    JSContext *ctx = JS_NewContext(runtime);
    if(ctx == NULL) {
        puts("unable to create JS context");
        goto cleanup_runtime_fail;
    }

    // could use js_std_eval_binary() to evaluate precompiled bytecode!
    // This would fix the security issues of running arbitrary JS, and allow you
    // to embed the entire module
    JSValue result = JS_Eval(ctx, js_content, js_bytes, dbjs, JS_EVAL_TYPE_MODULE);
    if(JS_IsException(result)) {
        fprintf(stderr, "error in module parsing: %s\n", JS_ToCString(ctx, JS_GetException(ctx)));
    } else if(JS_IsFunction(ctx, result)) {
        // We got determine_basal? I think?
        // Create all the arguments
        //JsValue  
    }

    JS_FreeValue(ctx, result);

    JS_RunGC(runtime);

cleanup_context:
    free(ctx);
cleanup_runtime_fail:
    free(runtime);
cleanup_content_fail:
    free(js_content);
    return;

}
