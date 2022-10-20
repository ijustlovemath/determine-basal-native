cmake_minimum_required(VERSION 3.15)
project(determine_basal_native)

add_compile_options(-fPIC)

include_directories(quickjs)
include_directories(include)
add_subdirectory(lib)
add_subdirectory(test)


