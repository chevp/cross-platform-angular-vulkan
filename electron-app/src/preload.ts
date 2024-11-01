import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("rendererAPI", {
  initialize: () => ipcRenderer.invoke("renderer-initialize"),
  update: (deltaTime: number) => ipcRenderer.invoke("renderer-update", deltaTime),
  setParameter: (param: number) => ipcRenderer.invoke("renderer-setParameter", param),
  cleanup: () => ipcRenderer.invoke("renderer-cleanup")
});