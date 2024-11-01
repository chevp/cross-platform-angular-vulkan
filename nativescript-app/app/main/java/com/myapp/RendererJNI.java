package com.myapp;

public class RendererJNI {
    static {
        System.loadLibrary("cpp_renderer");  // Load the C++ library
    }

    public static native void initialize();
    public static native void update(float deltaTime);
    public static native void setParameter(int param);
    public static native void cleanup();
}