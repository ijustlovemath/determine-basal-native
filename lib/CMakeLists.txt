
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

function(transpile_to_obj input_file output_obj output_dir)
    # TODO: add a transpile script so we can custom generate the input file
    # TODO: make it so all you have to do is supply the JS files that the library depends on,
    #       it should find them, transpile them, create the object file, add object file dependencies,
    #       and create an array with the object file names for ease of inclusion in add_BLANK() calls

    # For moving created variables into parent scope: https://hsf-training.github.io/hsf-training-cmake-webpage/11-functions/index.html
    # For automatically generating variable names: https://stackoverflow.com/questions/22638673/cmake-string-regex-replace

    add_custom_command(
            OUTPUT ${output_obj}
            COMMAND truncate -s +1 ${input_file} && ld -r -b binary -o ${output_obj} ${input_file}
            DEPENDS ${input_file}
            WORKING_DIRECTORY ${output_dir}
    )

endfunction()

add_custom_command(
        OUTPUT determine-basal.mjs basal-set-temp.mjs
        COMMAND /bin/sh ${CMAKE_SOURCE_DIR}/scripts/headless-bundle.sh ${CMAKE_SOURCE_DIR}
)

transpile_to_obj(determine-basal.mjs determine_basal.o ${CMAKE_BINARY_DIR})

transpile_to_obj(basal-set-temp.mjs basal_set_temp.o ${CMAKE_BINARY_DIR})

# This is absolutely critical to get it to run the custom generate commands FIRST
# Still need to make this cross platform but it's a great start!
set_property(SOURCE dbasal.c PROPERTY OBJECT_DEPENDS determine_basal.o basal_set_temp.o)

add_library(dbasal SHARED dbasal.c ${CMAKE_BINARY_DIR}/determine_basal.o ${CMAKE_BINARY_DIR}/basal_set_temp.o)
target_link_libraries(dbasal quickjs ${COMMON_LIBS})
