#include "dbjs.h"
#include "quickjs.h"

int main(void) {
    print_json(easy_context(), "test.json");
    determine_basal();
    return 0;
}
