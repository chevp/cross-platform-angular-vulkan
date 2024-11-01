
# Cross-Platform Angular and C++ Vulkan Tutorial

This tutorial will guide you in creating a cross-platform application using **Angular** for the UI, **C++ for Vulkan rendering**, and platform-specific integrations:
- **Electron** for desktop applications (Windows).
- **NativeScript** for mobile applications (Android).

### Prerequisites

- **Angular CLI**: Install via `npm install -g @angular/cli`
- **Electron**: Install via `npm install electron`
- **Node.js**: Required for Electron
- **NativeScript CLI**: Install via `npm install -g nativescript`
- **Visual Studio** (with C++ development tools) for Windows development
- **Android Studio** for Android development
- **WebView2 Runtime** (for Electron on Windows)

### Project Setup

#### Step 1: Create an Angular App

1. Initialize a new Angular project:

   ```bash
   ng new angular-vulkan-app
   cd angular-vulkan-app
   ```

2. Serve the Angular app for development:

   ```bash
   ng serve
   ```

#### Step 2: Set Up C++ with Vulkan

1. Create a C++ file structure:

   ```plaintext
   src/
   ├── Renderer.h
   ├── Renderer.cpp
   ├── main_binding.cpp  # For Electron Node.js binding
   ├── RendererJNI.cpp   # For Android JNI binding
   ```

2. Implement the `Renderer` class:

   ```cpp
   // Renderer.h
   #pragma once

   class Renderer {
   public:
       Renderer();
       ~Renderer();

       void initialize();
       void update(float deltaTime);
       void setParameter(int param);
       void cleanup();
   };
   ```

   ```cpp
   // Renderer.cpp
   #include "Renderer.h"
   #include <iostream>

   Renderer::Renderer() {}
   Renderer::~Renderer() {}

   void Renderer::initialize() {
       std::cout << "Renderer initialized" << std::endl;
   }

   void Renderer::update(float deltaTime) {
       std::cout << "Renderer updated with deltaTime: " << deltaTime << std::endl;
   }

   void Renderer::setParameter(int param) {
       std::cout << "Renderer parameter set to: " << param << std::endl;
   }

   void Renderer::cleanup() {
       std::cout << "Renderer cleanup" << std::endl;
   }
   ```

#### Step 3: Set Up Electron for Desktop (Windows)

1. Initialize Electron:

   ```bash
   npm install electron
   ```

2. Create the Electron main process file (`main.js`):

   ```javascript
   const { app, BrowserWindow } = require('electron');
   const rendererAddon = require('./build/Release/addon');

   function createWindow() {
       const win = new BrowserWindow({
           width: 800,
           height: 600,
           webPreferences: {
               preload: path.join(__dirname, 'preload.js')
           }
       });

       win.loadURL('http://localhost:4200');
       rendererAddon.initialize();
       rendererAddon.setParameter(42);
       setInterval(() => rendererAddon.update(0.016), 16);

       app.on('before-quit', () => {
           rendererAddon.cleanup();
       });
   }

   app.whenReady().then(createWindow);
   ```

3. Create Node.js addon for Electron (`main_binding.cpp`):

   ```cpp
   #include <napi.h>
   #include "Renderer.h"

   Renderer renderer;

   Napi::Value Initialize(const Napi::CallbackInfo& info) {
       Napi::Env env = info.Env();
       renderer.initialize();
       return env.Null();
   }

   Napi::Value Update(const Napi::CallbackInfo& info) {
       Napi::Env env = info.Env();
       float deltaTime = info[0].As<Napi::Number>().FloatValue();
       renderer.update(deltaTime);
       return env.Null();
   }

   Napi::Value SetParameter(const Napi::CallbackInfo& info) {
       Napi::Env env = info.Env();
       int param = info[0].As<Napi::Number>().Int32Value();
       renderer.setParameter(param);
       return env.Null();
   }

   Napi::Value Cleanup(const Napi::CallbackInfo& info) {
       Napi::Env env = info.Env();
       renderer.cleanup();
       return env.Null();
   }

   Napi::Object Init(Napi::Env env, Napi::Object exports) {
       exports.Set("initialize", Napi::Function::New(env, Initialize));
       exports.Set("update", Napi::Function::New(env, Update));
       exports.Set("setParameter", Napi::Function::New(env, SetParameter));
       exports.Set("cleanup", Napi::Function::New(env, Cleanup));
       return exports;
   }

   NODE_API_MODULE(addon, Init)
   ```

#### Step 4: NativeScript Setup for Android

1. Create JNI bindings (`RendererJNI.cpp`):

   ```cpp
   #include "Renderer.h"
   #include <jni.h>

   Renderer renderer;

   extern "C" JNIEXPORT void JNICALL Java_com_yourapp_Renderer_initialize(JNIEnv* env, jobject obj) {
       renderer.initialize();
   }

   extern "C" JNIEXPORT void JNICALL Java_com_yourapp_Renderer_update(JNIEnv* env, jobject obj, jfloat deltaTime) {
       renderer.update(deltaTime);
   }

   extern "C" JNIEXPORT void JNICALL Java_com_yourapp_Renderer_setParameter(JNIEnv* env, jobject obj, jint param) {
       renderer.setParameter(param);
   }

   extern "C" JNIEXPORT void JNICALL Java_com_yourapp_Renderer_cleanup(JNIEnv* env, jobject obj) {
       renderer.cleanup();
   }
   ```

2. JavaScript Service in NativeScript (`renderer-service.ts`):

   ```typescript
   import { android as androidApp } from "@nativescript/core/application";

   export class RendererService {
       private rendererClass;

       constructor() {
           this.rendererClass = androidApp.context.getClassLoader()
               .loadClass("com.yourapp.Renderer");
       }

       initialize() {
           this.rendererClass.getMethod("initialize").invoke(null);
       }

       update(deltaTime: number) {
           this.rendererClass.getMethod("update", java.lang.Float.TYPE).invoke(null, new java.lang.Float(deltaTime));
       }

       setParameter(param: number) {
           this.rendererClass.getMethod("setParameter", java.lang.Integer.TYPE).invoke(null, new java.lang.Integer(param));
       }

       cleanup() {
           this.rendererClass.getMethod("cleanup").invoke(null);
       }
   }
   ```

### Final Notes

- **Electron on Desktop**: Use `main_binding.cpp` for Node.js integration, allowing Angular to communicate with C++.
- **NativeScript on Android**: Use `RendererJNI.cpp` for JNI integration, enabling Angular NativeScript to call C++ methods.

This tutorial gives you a foundation for a cross-platform Angular + C++ Vulkan application on **desktop** (Electron) and **mobile** (NativeScript).
