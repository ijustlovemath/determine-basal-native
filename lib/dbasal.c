#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

#include "quickjs.h"

void determine_basal(void) {
    const char * dbjs = "./oref0/lib/determine_basal.js";

    if(access(dbjs, F_OK) == -1) {
        puts("determine_basal.js not found");
        return;
    }

    struct stat fstat;
    if(stat(dbjs, &fstat)) {
        perror("failed to stat determine_basal.js");
        return;
    }

    int js_bytes = fstat.st_size;

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

cleanup_content_fail:
    free(js_content);
    return;

}
