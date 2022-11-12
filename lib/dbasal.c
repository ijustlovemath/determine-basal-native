#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

#include "quickjs.h"
#include "quickjs-libc.h"

#define JS_INIT_MODULE js_init_module_std

JSValue jsFprint(JSContext *ctx, JSValueConst jsThis, int argc, JSValueConst *argv, FILE *f) {
	for (int i = 0; i < argc; ++i) {
    	if (i != 0) {
      		fputc(' ', f);
    	}
    	const char *str = JS_ToCString(ctx, argv[i]);
    	if (!str) {
      	return JS_EXCEPTION;
    	}
    	fputs(str, f);
    	JS_FreeCString(ctx, str);
  	}
  	fputc('\n', f);
  	return JS_UNDEFINED;
}

JSValue jsPrint(JSContext *ctx, JSValueConst jsThis, int argc, JSValueConst *argv) {
  	return jsFprint(ctx, jsThis, argc, argv, stdout);
}

JSValue jsPrintErr(JSContext *ctx, JSValueConst jsThis, int argc, JSValueConst *argv) {
  	return jsFprint(ctx, jsThis, argc, argv, stderr);
}

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

JSContext * easy_context(void)
{
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
    return ctx;

cleanup_runtime_fail:
    free(runtime);

cleanup_content_fail:
    return NULL;

}

void print_json(JSContext *ctx, const char *filename)
{
    //puts(JS_PrintValue(ctx, filename, json_from_filename(ctx, filename)));
    //(JS_PrintValue(ctx, filename, json_from_filename(ctx, filename)));
    puts(JS_ToCString(ctx, json_from_filename(ctx, filename)));
}

static JSContext *JS_NewCustomContext(JSRuntime *rt)
{
    JSContext *ctx = JS_NewContextRaw(rt);
    if (!ctx)
        return NULL;
    JS_AddIntrinsicBaseObjects(ctx);
    return ctx;
}

#include "determine_basal.h"
void determine_basal2(int argc, char *argv[])
{
    JSRuntime *rt;
    JSContext *ctx;

    rt = JS_NewRuntime();
    js_std_set_worker_new_context_func(JS_NewCustomContext);
    js_std_init_handlers(rt);
    ctx = JS_NewCustomContext(rt);
    js_std_add_helpers(ctx, argc, argv);
#define EVAL_BINARY 1
#if EVAL_BINARY
    js_std_eval_binary(ctx, qjsc_determine_basal, qjsc_determine_basal_size, 0);
    JSValue module = JS_ReadObject(ctx, qjsc_determine_basal, qjsc_determine_basal_size, JS_READ_OBJ_BYTECODE);
    //JS_GetPropertyStr()
#else
    JSValue module = js_module_loader(ctx, "determine-basal.mjs", NULL);
#endif
    if(JS_IsException(module)) {
        fprintf(stderr, "failed to read determine-basal module object");
        exit(1);
    }
#if EVAL_BINARY
    if(JS_ResolveModule(ctx, module)) {
        fprintf(stderr, "failed to resolve module");
        exit(1);
    }
#endif

    puts(JS_ToCString(ctx, module));
    JSValue dbasalfunc = JS_GetPropertyStr(ctx, module, "determine_basal");
    if(JS_IsException(dbasalfunc)) {
        puts("that didnt work");
    }
    if(JS_IsFunction(ctx, dbasalfunc)) {
        puts("success!");
    }
}

void add_debugging(JSContext *ctx)
{
	 JSValue global = JS_GetGlobalObject(ctx);

	 // globalThis に console を追加
	 JSValue console = JS_NewObject(ctx);
	 JS_SetPropertyStr(ctx, global, "console", console);
	 // console.log を設定
	 JS_SetPropertyStr(ctx, console, "log", JS_NewCFunction(ctx, jsPrint, "log", 1));
	 // console.error を設定
	 JS_SetPropertyStr(ctx, console, "error", JS_NewCFunction(ctx, jsPrintErr, "error", 1));

	 JS_FreeValue(ctx, global);
}

void list_properties (JSContext *ctx, JSValue map, const char *comment)
{
    JSPropertyEnum *ptab;
    uint32_t plen;
    JS_GetOwnPropertyNames(ctx, &ptab, &plen, map, JS_GPN_STRING_MASK);

    for (int i = 0; i < plen; i++) {
        JSValue val = JS_GetProperty(ctx, map, ptab[i].atom);
        // get the key
        const char *keyS = JS_AtomToCString(ctx, ptab[i].atom);
        // get the value (in this example I am only interested in values that are string
        if (JS_IsString(val)) {
            const char *valS = JS_ToCString(ctx, val);
            printf("   %s: k=%s, v=%s \n", comment, keyS, valS);
            JS_FreeCString(ctx, valS);
        } else {
            printf("   %s: k=%s,value is not a String. Ignoring! \n", comment, keyS);
        }
        JS_FreeCString(ctx, keyS);
        JS_FreeAtom(ctx, ptab[i].atom);
    }
    free(ptab);
}

void determine_basal3(int argc, char *argv[])
{
    const char * dbjs = "determine-basal.mjs";

    int js_bytes = file_size_from_filename(dbjs);
    char * js_content = file_contents_from_filename(dbjs, js_bytes);
    if(js_content == NULL) {
        goto done;
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

    JSValue result = JS_Eval(ctx, js_content, js_bytes, dbjs, JS_EVAL_TYPE_MODULE);
    if(JS_IsException(result)) {
        puts("failed to parse module");
        goto cleanup_context;
    }

    JSValue root = JS_GetGlobalObject(ctx);
    JSValue global = JS_GetPropertyStr(ctx, root, "globalThis");

    list_properties(ctx, global, "globalThis");
    list_properties(ctx, root, "root");

    JSValue profile = json_from_filename(ctx, "profile.json");
    JSValue currenttemp = json_from_filename(ctx, "currenttemp.json");
    JSValue glucose = json_from_filename(ctx, "glucose.json");
    JSValue iob = json_from_filename(ctx, "iob_data.json");

    JSValue dbasal = JS_GetPropertyStr(ctx, global, "determine_basal");
    if(JS_IsException(dbasal)) {
        puts("failed to find determine_basal function");
        goto cleanup_context;
    }

    JSValue args[] = {glucose, currenttemp, iob, profile};
    JSValue rT = JS_Call(ctx, dbasal, global, sizeof(args)/sizeof(*args), args);
    if(JS_IsException(rT)) {
        const char * exception = JS_ToCString(ctx, JS_GetException(ctx));
        puts(exception);
    }
    puts(JS_ToCString(ctx, rT));

    if(JS_IsFunction(ctx, dbasal)) {
        puts("success!");
    }


    JS_FreeValue(ctx, result);

    JS_RunGC(runtime);

cleanup_context:
    free(ctx);
cleanup_runtime_fail:
    free(runtime);
cleanup_content_fail:
    free(js_content);
done:
    return;
}


void determine_basal(int argc, char *argv[]) {
    const char *dbjs = "determine-basal.mjs";

    int js_bytes = file_size_from_filename(dbjs);
    char * js_content = file_contents_from_filename(dbjs, js_bytes);
    if(js_content == NULL) {
        goto done;
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
    const char * module_name = "require_determine_basal";
    //JS_AddModuleExport(ctx, JS_INIT_MODULE(ctx, module_name), module_name);
    //JSModuleDef *module = js_module_loader(ctx, dbjs, NULL);
    //JSValue result = JS_AddModuleExport(ctx, module, "determine_basal");
    JS_Eval(ctx, js_content, js_bytes, dbjs, JS_EVAL_TYPE_MODULE);
    JSValue result = JS_UNDEFINED;
    if(JS_IsException(result)) {
        fprintf(stderr, "error in module parsing: %s\n", JS_ToCString(ctx, JS_GetException(ctx)));
    } else if(JS_IsFunction(ctx, result)) {
        // We got determine_basal? I think?
        // Create all the arguments
        //JsValue  
        puts("wait i think we made it");
//    } else if(JS_IsModule(ctx, result)) {
//        puts("we have a module");
    } else if(JS_IsUndefined(result)) {
        puts("resulting object undefined");
    } else {
        puts("not sure what we have");
        puts(JS_AtomToCString(ctx, JS_ValueToAtom(ctx, result)));
        printf("tag: %02x %d\n", JS_VALUE_GET_TAG(result), JS_VALUE_GET_TAG(result));
        if(JS_HasProperty(ctx, result, JS_NewAtom(ctx, module_name))) {
            puts("dbasal found");
        }
    }

    JS_FreeValue(ctx, result);

    JS_RunGC(runtime);

cleanup_context:
    free(ctx);
cleanup_runtime_fail:
    free(runtime);
cleanup_content_fail:
    free(js_content);
done:
    return;

}
