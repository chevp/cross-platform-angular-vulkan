cmake_minimum_required(VERSION 3.10)
project(CrossPlatformVulkanApp)

# Set C++ Standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include paths for Vulkan SDK
find_package(Vulkan REQUIRED)
include_directories(${Vulkan_INCLUDE_DIR})

# Source files
set(SOURCES
    Renderer.cpp
)

set(HEADERS
    Renderer.h
)

# Common target for the Vulkan renderer
add_library(RendererLib STATIC ${SOURCES} ${HEADERS})
target_link_libraries(RendererLib ${Vulkan_LIBRARIES})

# Set up for Electron (Node.js Addon) or NativeScript (JNI)

# Node.js Addon for Electron
if (ELECTRON)
    # Add Node.js Addon build target
    find_package(NODEJS REQUIRED)  # Ensure Node.js is available
    include_directories(${NODEJS_INCLUDE_DIRS})
    
    add_library(addon MODULE main_binding.cpp)
    target_link_libraries(addon PRIVATE RendererLib ${NODEJS_LIBRARIES})
    
    set_target_properties(addon PROPERTIES PREFIX "" SUFFIX ".node")
endif()

# JNI Library for NativeScript on Android
if (ANDROID)
    # Add JNI build target for Android
    find_package(JNI REQUIRED)
    include_directories(${JNI_INCLUDE_DIRS})
    
    add_library(renderer_jni SHARED RendererJNI.cpp)
    target_link_libraries(renderer_jni PRIVATE RendererLib ${JNI_LIBRARIES})
    
    set_target_properties(renderer_jni PROPERTIES OUTPUT_NAME "cpp_renderer")
endif()
