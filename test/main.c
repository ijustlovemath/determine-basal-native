#include "dbjs.h"
#include "quickjs.h"

int main(int argc, char *argv[]) {
    print_json(easy_context(), "test.json");
    determine_basal2(argc, argv);
    return 0;
}
