add_library(dbasal SHARED dbasal.c)

# from here: https://stackoverflow.com/questions/7876753/reusing-custom-makefile-for-static-library-with-cmake
set(QJS_ROOT ${CMAKE_SOURCE_DIR}/quickjs)
set(QJS_LIB ${QJS_ROOT}/libquickjs.a)
add_custom_target(build_qjs ALL
    COMMAND ${CMAKE_MAKE_PROGRAM}
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/quickjs
    COMMENT "Building QuickJS static library"
)
add_library(quickjs STATIC IMPORTED)
set_property(TARGET quickjs APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(quickjs PROPERTIES
    IMPORTED_LOCATION_NOCONFIG "${QJS_LIB}")

add_dependencies(quickjs build_qjs)
target_compile_options(quickjs INTERFACE -fPIC)

target_link_libraries(dbasal quickjs)
