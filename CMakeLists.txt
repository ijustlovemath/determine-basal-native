cmake_minimum_required(VERSION 3.7)
project(determine_basal_native)

add_compile_options(-fPIC)
set(COMMON_LIBS m pthread dl)

set(CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -O0 -fvar-tracking -fvar-tracking-assignments")

include_directories(quickjs)
include_directories(include)
add_subdirectory(lib)
add_subdirectory(test)


