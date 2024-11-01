# Software Architecture

```plaintext
+-------------------------+                      +-------------------------+
|                         |                      |                         |
|       Angular UI        |                      |       C++ Renderer      |
|     (Electron/NativeScript)                    |         (Vulkan)        |
|                         |                      |                         |
+-------------------------+                      +-------------------------+
             |                                            |
             v                                            v
+-------------------------+                      +-------------------------+
| Electron IPC or JNI     |                      |      Rendering Logic    |
| Communication Layer     |<-------------------->|   - Scene Loading       |
| - Node.js Addon (Electron)                     |   - Model Management    |
| - JNI (NativeScript)                           |   - Lighting & Shading  |
+-------------------------+                      |                         |
             |                                   |                         |
             v                                   +-------------------------+
+-------------------------+                      +-------------------------+
|       Platform-Specific                         |       Communication    |
|         Integrations                           |        Layer           |
|  - Electron: Node.js, IPC                      |                         |
|  - NativeScript: Java, Android APIs            +-------------------------+
+-------------------------+
```

## Component Breakdown

### Angular UI Layer

- Role: The UI layer is implemented in Angular and provides the frontend interface, including controls, settings, and user interactions.
- Platform-Specific Implementations:
- Electron: Runs Angular inside a Chromium window, using Node.js for access to file systems and other desktop functionalities.
- NativeScript: Runs Angular within a native application shell, allowing access to native Android components and services.
Key Responsibilities:
Capture user inputs (e.g., sliders, buttons).
Display status information (e.g., frame rate, rendering options).
Send and receive data to and from the C++ renderer using IPC (Electron) or JNI (NativeScript).
C++ Renderer Layer (Vulkan)

Role: The C++ renderer is the core of the Vulkan-based 3D rendering engine. This layer is shared across platforms, handling all rendering, model loading, scene management, and graphics pipeline operations.
Key Components:
Scene Management: Loads and updates the scene based on static files or real-time input.
Rendering Pipeline: Configures Vulkan to handle drawing commands, shading, lighting, and other graphical processing tasks.
Real-Time Updates: Receives user control data and updates the rendering parameters (e.g., camera position, object properties).
Platform-Specific Integration Layer

Role: Bridges the Angular UI and C++ renderer by handling communication and platform-specific interactions.
Implementations:
Electron (Desktop):
Uses Node.js C++ Addons to expose the C++ renderer functions to the Electron application.
IPC (Inter-Process Communication) facilitates data exchange between the Angular renderer process and C++ functions.
NativeScript (Android):
Uses JNI (Java Native Interface) to bind C++ functions to Java, enabling Angular (in NativeScript) to call these functions directly.
NativeScript provides a JavaScript bridge to Android APIs, allowing Angular to interact with Android OS features as needed.
Communication Layer

Role: Manages bidirectional communication between the Angular UI and the C++ renderer, enabling real-time updates and control.
Mechanisms:
Electron IPC: For Electron, the Angular renderer process communicates with the C++ renderer using IPC calls through Node.js Addons.
JNI (Java): For NativeScript on Android, Angular calls JNI methods to invoke C++ functions directly, and JNI provides responses back to Angular.
Data Flow and Interactions
User Interaction in Angular UI:

Users interact with the Angular UI (e.g., changing a camera angle or toggling objects).
Angular captures these inputs and sends them to the C++ renderer using either Electron’s IPC mechanism or NativeScript’s JNI bindings.
Data Processing in C++ Renderer:

The C++ renderer receives control data from the Angular UI (e.g., parameter updates) and applies these to the rendering pipeline.
The renderer performs calculations, updates objects, and runs the Vulkan rendering pipeline based on the inputs.
Rendering Updates and Feedback:

The renderer processes the scene and updates any relevant output parameters (e.g., frame rate, rendering status).
In Electron, data is sent back to Angular via IPC, while in NativeScript, data is communicated back to Angular through JNI calls.
Platform-Specific Functionality:

Electron: Node.js modules enable Angular to access desktop features (e.g., filesystem, OS notifications) if needed.
NativeScript: Angular can access Android features (e.g., sensors, notifications) through NativeScript’s JavaScript bridge.
Platform Deployment Differences
Electron (Desktop):

Primary Components: Angular for UI, Electron for platform integration, Node.js Addon for C++ renderer.
Development Tools: Visual Studio, Node.js, and Electron.
Communication: Electron IPC and Node.js Addon for C++ integration.
NativeScript (Android):

Primary Components: Angular for UI, NativeScript for platform integration, JNI for C++ renderer.
Development Tools: Android Studio and NativeScript CLI.
Communication: NativeScript JavaScript bridge and JNI for C++ integration.
Advantages of This Architecture
Modular and Cross-Platform: Each layer is isolated, allowing independent development and easy porting across desktop and mobile.
Shared Codebase: The C++ renderer and Angular UI are shared across both platforms, reducing duplication and ensuring consistency.
Optimized for Native Performance: By keeping the renderer in C++, both platforms benefit from high-performance Vulkan rendering.
Native Integration Flexibility: Each platform can extend Angular’s capabilities with native features specific to Electron or Android, giving a richer experience to users.
This architecture provides a robust foundation for cross-platform development, where UI, rendering, and platform integrations are clearly separated yet flexible enough to maximize code reuse across desktop and mobile.