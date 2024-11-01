import { Utils } from "@nativescript/core";

declare const com: any;

export class RendererService {
  private static instance: RendererService;
  private rendererJNI: any;

  private constructor() {
    // Initialize the native Java class `RendererJNI`
    this.rendererJNI = com.yourapp.RendererJNI;
  }

  // Singleton pattern to ensure only one instance of RendererService
  public static getInstance(): RendererService {
    if (!RendererService.instance) {
      RendererService.instance = new RendererService();
    }
    return RendererService.instance;
  }

  // Initialize the renderer
  public initialize(): void {
    try {
      this.rendererJNI.initialize();
      console.log("Renderer initialized successfully");
    } catch (error) {
      console.error("Error initializing renderer:", error);
    }
  }

  // Update the renderer with delta time
  public update(deltaTime: number): void {
    try {
      this.rendererJNI.update(deltaTime);
      console.log(`Renderer updated with deltaTime: ${deltaTime}`);
    } catch (error) {
      console.error("Error updating renderer:", error);
    }
  }

  // Set a parameter in the renderer
  public setParameter(param: number): void {
    try {
      this.rendererJNI.setParameter(param);
      console.log(`Renderer parameter set to: ${param}`);
    } catch (error) {
      console.error("Error setting parameter in renderer:", error);
    }
  }

  // Clean up renderer resources
  public cleanup(): void {
    try {
      this.rendererJNI.cleanup();
      console.log("Renderer cleaned up successfully");
    } catch (error) {
      console.error("Error cleaning up renderer:", error);
    }
  }
}