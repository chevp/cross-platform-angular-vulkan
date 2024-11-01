/**
 * Copyright (C) by chevp
 */
#include <jni.h>
#include "Renderer.h"  // Include your Renderer class header
#include <android/log.h>

// Define a tag for logging
#define LOG_TAG "RendererJNI"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

// Create an instance of the Renderer class
Renderer renderer;

// Initialize the renderer
extern "C" JNIEXPORT void JNICALL
Java_com_yourapp_RendererJNI_initialize(JNIEnv *env, jobject obj) {
    renderer.initialize();
    LOGI("Renderer initialized");
}

// Update the renderer with a delta time
extern "C" JNIEXPORT void JNICALL
Java_com_yourapp_RendererJNI_update(JNIEnv *env, jobject obj, jfloat deltaTime) {
    renderer.update(deltaTime);
    LOGI("Renderer updated with deltaTime: %f", deltaTime);
}

// Set a parameter in the renderer
extern "C" JNIEXPORT void JNICALL
Java_com_yourapp_RendererJNI_setParameter(JNIEnv *env, jobject obj, jint param) {
    renderer.setParameter(param);
    LOGI("Renderer parameter set to: %d", param);
}

// Cleanup the renderer resources
extern "C" JNIEXPORT void JNICALL
Java_com_yourapp_RendererJNI_cleanup(JNIEnv *env, jobject obj) {
    renderer.cleanup();
    LOGI("Renderer cleaned up");
}