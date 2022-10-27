cmake_minimum_required(VERSION 3.7)
project(determine_basal_native)

add_compile_options(-fPIC)
set(COMMON_LIBS m)

include_directories(quickjs)
include_directories(include)
add_subdirectory(lib)
add_subdirectory(test)


