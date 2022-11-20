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

static inline JSValue json_from_string_with_name(JSContext *ctx, const char *str, size_t length, const char *filename)
{
    return JS_ParseJSON(ctx, str, length, filename);
}

static inline JSValue json_from_string(JSContext *ctx, const char *str, size_t length)
{
    return json_from_string_with_name(ctx, str, length, "<input>");
}

static inline JSValue json_from_string_auto(JSContext *ctx, const char * str)
{
    return json_from_string(ctx, str, strlen(str));
}

static inline JSValue json_from_string_auto_with_name(JSContext *ctx, const char * str, const char *filename)
{
    return json_from_string_with_name(ctx, str, strlen(str), filename);
}

static inline JSValue json_from_filename(JSContext *ctx, const char *filename)
{
    
    int total_bytes = file_size_from_filename(filename);
    char *contents = file_contents_from_filename(filename, total_bytes);
    if(contents == NULL) {
        return JS_UNDEFINED;
    }

    return json_from_string_with_name(ctx, contents, total_bytes, filename);
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

void print_exception(JSContext *ctx)
{
    const char * exception = (JS_ToCString(ctx, JS_GetException(ctx)));
    puts(exception);
}

static JSContext *JS_NewCustomContext(JSRuntime *rt)
{
    JSContext *ctx = JS_NewContextRaw(rt);
    if (!ctx)
        return NULL;
    JS_AddIntrinsicBaseObjects(ctx);
    return ctx;
}

void list_properties (JSContext *ctx, JSValue map, const char *comment)
{
    // https://www.freelists.org/post/quickjs-devel/How-to-iterate-over-all-properties-of-a-JS-map
    JSPropertyEnum *ptab;
    uint32_t plen;

    if(JS_IsUndefined(map)) {
        printf("%s: can't list properties of undefined", comment);
        return;
    }

    JS_GetOwnPropertyNames(ctx, &ptab, &plen, map, JS_GPN_STRING_MASK);

    for (int i = 0; i < plen; i++) {
        // get the key
        const char *keyS = JS_AtomToCString(ctx, ptab[i].atom);
        JSValue val = JS_GetProperty(ctx, map, ptab[i].atom);
        // get the value (in this example I am only interested in values that are string
        if (JS_IsString(val)) {
            const char *valS = JS_ToCString(ctx, val);
            printf("   %s: k=%s, v=r'%s' \n", comment, keyS, valS);
            JS_FreeCString(ctx, valS);
        } else if(JS_IsFunction(ctx, val)) {
            printf("   %s: k=%s, v=<function text ommitted>\n", comment, keyS);
        } else {
            const char *valS = JS_ToCString(ctx, val);
            printf("   %s: k=%s, v='%s'\n", comment, keyS, valS);
            JS_FreeCString(ctx, valS);
        }
        JS_FreeCString(ctx, keyS);
        JS_FreeAtom(ctx, ptab[i].atom);
    }
    free(ptab);
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
    //JSValue module = JS_ReadObject(ctx, qjsc_determine_basal, qjsc_determine_basal_size, JS_READ_OBJ_BYTECODE);
    JSValue module = JS_UNDEFINED;
    //JS_GetPropertyStr()
    JSValue global = JS_GetGlobalObject(ctx);
    list_properties(ctx, global, "globalthis");
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
        print_exception(ctx);
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

     /* stubbing process so we can redirect it */
     JSValue process = JS_NewObject(ctx);
     JS_SetPropertyStr(ctx, global, "process", process);

     /* adding process.stderr.write */
     JSValue pstderr = JS_NewObject(ctx);
     JS_SetPropertyStr(ctx, process, "stderr", pstderr);
     JS_SetPropertyStr(ctx, pstderr, "write", JS_NewCFunction(ctx, jsPrintErr, "write", 1));

	 JS_FreeValue(ctx, global);
}

JSValue commonjs_module_to_function(JSContext *ctx, const char *filename, const char *function_name)
{
    int js_bytes = file_size_from_filename(filename);
    char * js_content = file_contents_from_filename(filename, js_bytes);
    JSValue result = JS_UNDEFINED;
    char * module_function_name = NULL;

    // TODO: build a linked list of JSValues to free

    if(js_content == NULL) {
        goto done;
    }

    /* THIS is what I was missing!!!! CommonJS lets you evaluate it as global (just have to remove export default)
     * bundle.sh processes this for us by doing esbuild, then replacing unfriendly parts (Function(), export default)
     * with QuickJS-friendly counterparts
     */
    result = JS_Eval(ctx, js_content, js_bytes, filename, JS_EVAL_TYPE_GLOBAL);

    if(JS_IsException(result)) {
        printf("failed to parse module '%s'\n", filename);
        print_exception(ctx);
        goto cleanup_fail;
    }

    JSValue global = JS_GetGlobalObject(ctx);

    asprintf(&module_function_name, "require_%s", function_name);
    JSValue module = JS_GetPropertyStr(ctx, global, module_function_name);
    if(JS_IsException(module)) {
        printf("failed to find %s module function\n", function_name);
        goto cleanup_fail;
    }
    result = JS_Call(ctx, module, global, 0, NULL);
    if(JS_IsException(result)) {
        print_exception(ctx);
        goto cleanup_fail;
    }

    /* don't lose the object we've built by passing over failure case */
    goto done;

cleanup_fail:
    /* nothing to do, cleanup context elsewhere */
    result = JS_UNDEFINED;

done:
    free(js_content);
    free(module_function_name);
    return result;
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

    /* THIS is what I was missing!!!! CommonJS lets you evaluate it as global (just have to remove export default) */
    JSValue result = JS_Eval(ctx, js_content, js_bytes, dbjs, JS_EVAL_TYPE_GLOBAL);
    if(JS_IsException(result)) {
        puts("failed to parse module");
        print_exception(ctx);
        goto cleanup_context;
    }

    add_debugging(ctx); // gives us console.log and console.error

    JSValue global = JS_GetGlobalObject(ctx);
    list_properties(ctx, result, "eval-result");
    list_properties(ctx, global, "post-eval-global");

    JSValue profile = json_from_filename(ctx, "profile.json");
    JSValue currenttemp = json_from_filename(ctx, "temp-basal-status.json");
    JSValue glucose = json_from_filename(ctx, "glucose_status.json");
    JSValue iob = json_from_filename(ctx, "iob_data.json");
    JSValue meal_data = json_from_filename(ctx, "meal_data.json");

    // The first function call gets us the actual function object; commonJS shit
    JSValue dbasal_module = JS_GetPropertyStr(ctx, global, "require_determine_basal");
    if(JS_IsException(dbasal_module)) {
        puts("failed to find determine_basal function");
        goto cleanup_context;
    }
    /*                 g_s, temp-basal-status, iob_data, profile, autosens_data, meal_data*/
    JSValue args[] = {glucose
                      , currenttemp
                      , iob
                      , profile
                      , json_from_string_auto(ctx, "{\"ratio\":1.0}")
                      , meal_data
    };
    JSValue dbasal = JS_Call(ctx, dbasal_module, global, 0, NULL);
    if(JS_IsException(dbasal)) {
        print_exception(ctx);
    }

    if(JS_IsFunction(ctx, dbasal)) {
        puts("success!");
    }

    JSValue rT = JS_Call(ctx, dbasal, global, sizeof(args)/sizeof(*args), args);
    if(JS_IsException(rT)) {
        print_exception(ctx);
    }
    list_properties(ctx, rT, "rT!!@!@!");

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

void determine_basal_embed(int argc, char *argv[])
{

    /* now that we have the file, setup the interpreter */
    JSRuntime *runtime = JS_NewRuntime();
    if(runtime == NULL) {
        puts("unable to create JS Runtime");
        goto done;
    }

    JSContext *ctx = JS_NewContext(runtime);
    if(ctx == NULL) {
        puts("unable to create JS context");
        goto cleanup_runtime_fail;
    }

    // only want to load it into global namespace
    js_std_eval_binary(ctx, qjsc_determine_basal, qjsc_determine_basal_size, 0);

    JSValue global = JS_GetGlobalObject(ctx);

    list_properties(ctx, global, "after-binary-eval");
cleanup_runtime_fail:
    free(runtime);
cleanup_content_fail:
    //free(js_content);
done:
    return;
}

void determine_basal(int argc, char *argv[])
{
    /* now that we have the file, setup the interpreter */
    JSRuntime *runtime = JS_NewRuntime();
    if(runtime == NULL) {
        puts("unable to create JS Runtime");
        goto done;
    }

    JSContext *ctx = JS_NewContext(runtime);
    if(ctx == NULL) {
        puts("unable to create JS context");
        goto cleanup_runtime_fail;
    }

    add_debugging(ctx); // gives us console.log and console.error
    JSValue global = JS_GetGlobalObject(ctx);

    JSValue profile = json_from_filename(ctx, "profile.json");
    JSValue currenttemp = json_from_filename(ctx, "temp-basal-status.json");
    JSValue glucose = json_from_filename(ctx, "glucose_status.json");
    JSValue iob = json_from_filename(ctx, "iob_data.json");
    JSValue meal_data = json_from_filename(ctx, "meal_data.json");

    /* tempBasalFunctions callbacks */
    JSValue tempbasal = commonjs_module_to_function(ctx, "basal-set-temp.mjs", "basal_set_temp");

    JSValue args[] = {glucose // glucose_status.json
            , currenttemp //temp-basal-status.json
            , iob // iob_data.json
            , profile // profile.json
            , json_from_string_auto(ctx, "{\"ratio\":1.0}") //autosens_data.json
            , meal_data // meal_data.json
            , tempbasal // this is a literal callback function! how cool is that!
    };
    JSValue dbasal = commonjs_module_to_function(ctx, "determine-basal.mjs", "determine_basal");

    list_properties(ctx, global, "after-temp-basal");

    JSValue rT = JS_Call(ctx, dbasal, global, sizeof(args)/sizeof(*args), args);

    list_properties(ctx, dbasal, "dbasal");
    list_properties(ctx, tempbasal, "tempbasal");
    list_properties(ctx, rT, "rT");

cleanup_context:
    free(ctx);
cleanup_runtime_fail:
    free(runtime);
done:
    return;
}

void determine_basal1(int argc, char *argv[]) {
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
