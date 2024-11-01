declare global {
  interface Window {
    rendererAPI: {
      initialize: () => Promise<void>;
      update: (deltaTime: number) => Promise<void>;
      setParameter: (param: number) => Promise<void>;
      cleanup: () => Promise<void>;
    };
  }
}