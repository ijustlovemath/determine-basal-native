#include "dbjs.h"
#include "quickjs.h"

#include <string.h>
#include <stdio.h>
#include <inttypes.h>

void simple_test() {
    JSContext *ctx = easy_context();
    const char * code = "function foo (input) { return input + 3; }";
    JSValue result = JS_Eval(ctx, code, strlen(code), "<input>", JS_EVAL_TYPE_GLOBAL);
// some error checking...
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue foo = JS_GetPropertyStr(ctx, global, "foo");
    JSValue arg = JS_NewInt32(ctx, 5);
    JSValue args[] = {arg};
    result = JS_Call(ctx, foo, global, 1, args);
    int32_t res;
    JS_ToInt32(ctx, &res, result);
    printf("foo(5) = %"PRIi32"\n", res);
}
int main(int argc, char *argv[]) {
    //determine_basal2(argc, argv);
    determine_basal(argc, argv);
    return 0;
}
