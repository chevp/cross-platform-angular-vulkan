
# Cross-Platform Angular + C++ Vulkan Application

This project enables cross-platform development using **Angular** for the UI, **C++ with Vulkan** for high-performance rendering, and **platform-specific integrations** using **Electron** for desktop (Windows) and **NativeScript** for Android.

---

### Components

1. **Angular UI Layer**:
   - Provides the UI across both platforms using Angular. Interacts with the C++ renderer through platform-specific communication layers (IPC in Electron, JNI in NativeScript).

2. **C++ Renderer Layer (Vulkan)**:
   - Core renderer handling Vulkan-based 3D rendering, scene management, and model updates. Shared code across both desktop and mobile platforms.

3. **Platform-Specific Integration Layer**:
   - **Electron (Desktop)**: Uses Node.js Addons and IPC to communicate with the C++ renderer.
   - **NativeScript (Mobile)**: Uses JNI for communication between Angular and C++ renderer on Android.

4. **Communication Layer**:
   - Manages real-time data exchange between Angular and C++ (e.g., control parameters, renderer updates).

---

## Folder Structure

```plaintext
project-root/
├── angular-app/                          # Angular application
│   ├── src/
│   ├── dist/                             # Production build output
├── cpp-renderer/                         # C++ Renderer and Vulkan code
│   ├── Renderer.h
│   ├── Renderer.cpp
│   ├── main_binding.cpp                  # Electron Node.js binding
│   ├── RendererJNI.cpp                   # JNI binding for NativeScript on Android
│   └── CMakeLists.txt                    # C++ build file
├── electron-app/                         # Electron-specific files for desktop
│   ├── main.js                           # Electron main process
│   ├── preload.js                        # Preload script
│   ├── package.json                      # Electron configuration
│   └── build/Release/addon.node          # Compiled Node.js addon
├── nativescript-app/                     # NativeScript-specific files for Android
│   ├── app/
│   │   ├── src/main/java/com/yourapp/Renderer.java # Java file for JNI interface
│   │   └── renderer-service.ts                   # NativeScript service for JNI
├── README.md                                     # Project documentation
└── Angular-C++-Vulkan-Tutorial.md                # Tutorial
```

---

## Setup Instructions

### 1. Set Up Angular

1. Navigate to `angular-app/` and install dependencies:

   ```bash
   cd angular-app
   npm install
   ```

2. Serve the Angular app (for development):

   ```bash
   ng serve
   ```

### 2. Set Up C++ Renderer with Vulkan

1. Navigate to `cpp-renderer/`.
2. Compile C++ files for your platform using CMake:

   ```bash
   mkdir build && cd build
   cmake ..
   make
   ```

### 3. Set Up Electron (Desktop)

1. Go to `electron-app/` and install dependencies:

   ```bash
   cd electron-app
   npm install
   ```

2. Start Electron with Angular:

   ```bash
   npm start
   ```

### 4. Set Up NativeScript (Android)

1. Go to `nativescript-app/` and install dependencies:

   ```bash
   cd nativescript-app
   tns install
   ```

2. Compile and run on Android:

   ```bash
   tns run android
   ```

---

## Development Notes

- **Electron**: Handles desktop-specific functionality via Node.js Addons and IPC. Launches Angular and manages communication with the C++ layer.
- **NativeScript**: Provides a JavaScript bridge to interact with native Android features and C++ rendering logic using JNI.

This setup ensures that UI, rendering, and platform-specific code remain modular, making it easy to develop and maintain across desktop and mobile platforms.
