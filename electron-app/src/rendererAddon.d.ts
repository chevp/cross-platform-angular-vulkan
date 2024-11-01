declare module "addon.node" {
  const rendererAddon: {
    initialize: () => void;
    update: (deltaTime: number) => void;
    setParameter: (param: number) => void;
    cleanup: () => void;
  };
  export = rendererAddon;
}