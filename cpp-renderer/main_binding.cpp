/**
 * Copyright (C) by chevp
 */
#include <napi.h>
#include "Renderer.h"  // Include your Renderer class

// Create an instance of the Renderer class
Renderer renderer;

// Initialize the renderer
Napi::Value Initialize(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    renderer.initialize();
    return env.Null();
}

// Update the renderer with a delta time
Napi::Value Update(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(env, "Expected a number as the delta time").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    float deltaTime = info[0].As<Napi::Number>().FloatValue();
    renderer.update(deltaTime);
    return env.Null();
}