
# from here: https://stackoverflow.com/questions/7876753/reusing-custom-makefile-for-static-library-with-cmake
#set(QJS_ROOT ${CMAKE_SOURCE_DIR}/quickjs)
#set(QJS_LIB ${QJS_ROOT}/libquickjs.lto.a)
#add_custom_target(build_qjs ALL
#    COMMAND ${CMAKE_MAKE_PROGRAM}
#    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/quickjs
#    COMMENT "Building QuickJS static library"
#)
#add_library(quickjs STATIC IMPORTED)
#set_property(TARGET quickjs APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
#set_target_properties(quickjs PROPERTIES
#    IMPORTED_LOCATION_NOCONFIG "${QJS_LIB}")
#
#add_dependencies(quickjs build_qjs)
#target_compile_options(quickjs INTERFACE -fPIC)
# ------------ Download CPM CMake Script ----------------#

## Automatically donwload and use module CPM.cmake
file(DOWNLOAD https://raw.githubusercontent.com/TheLartians/CPM.cmake/v0.26.2/cmake/CPM.cmake
        "${CMAKE_BINARY_DIR}/CPM.cmake")
include("${CMAKE_BINARY_DIR}/CPM.cmake")

#----------- Add dependencies --------------------------#

CPMAddPackage(
        NAME               quickjs
        GITHUB_REPOSITORY  bellard/quickjs
        GIT_TAG            2788d71e823b522b178db3b3660ce93689534e6d
        # DOWNLOAD_ONLY YES
)


# Add this directory where is this file (CMakeLists.txt) to include path.
include_directories( ${CMAKE_CURRENT_LIST_DIR} )

# =============== QuickJS settings ====================================#

include_directories( ${quickjs_SOURCE_DIR}/ )
message([TRACE] " quickjs source = ${quickjs_SOURCE_DIR} ")

file(GLOB quickjs_hpp ${quickjs_SOURCE_DIR}/*.h )

file(GLOB quickjs_src ${quickjs_SOURCE_DIR}/quickjs.c
        ${quickjs_SOURCE_DIR}/libregexp.c
        ${quickjs_SOURCE_DIR}/libunicode.c
        ${quickjs_SOURCE_DIR}/cutils.c
        ${quickjs_SOURCE_DIR}/quickjs-libc.c
        ${quickjs_SOURCE_DIR}/libbf.c
        )


add_library( quickjs ${quickjs_src} ${quickjs_hpp} )
target_compile_options( quickjs PRIVATE
        -MMD -MF
        -Wno-sign-compare
        -Wno-missing-field-initializers
        -Wundef -Wuninitialized
        -Wundef -Wuninitialized -Wwrite-strings -Wchar-subscripts
        )
target_compile_definitions( quickjs PUBLIC
        CONFIG_BIGNUM=y
        CONFIG_VERSION="2021-03-27"
        DUMP_MODULE_RESOLVE=1
        _GNU_SOURCE
        )

if(UNIX)
    target_link_libraries( quickjs PRIVATE ${COMMON_LIBS})
endif()

# =========== Target Settings =========================================#

# QuickJS compiler.
add_executable( qjsc ${quickjs_SOURCE_DIR}/qjsc.c )
target_compile_definitions( qjsc  PUBLIC  CONFIG_BIGNUM=y  CONFIG_VERSION="2020-11-08"  _GNU_SOURCE )
target_link_libraries( qjsc  quickjs )


add_custom_command(
        OUTPUT determine-basal.mjs
        COMMAND /bin/sh ${CMAKE_SOURCE_DIR}/scripts/headless-bundle.sh ${CMAKE_SOURCE_DIR}
)

add_custom_command(
        OUTPUT determine_basal.o
        COMMAND ld -r -b binary -o determine_basal.o determine-basal.mjs
        DEPENDS determine-basal.mjs
        WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
)

add_library(dbasal SHARED dbasal.c ${CMAKE_BINARY_DIR}/determine_basal.o)
target_link_libraries(dbasal quickjs ${COMMON_LIBS})
