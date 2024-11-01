import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

// Use `__dirname` to point to the correct location of the addon in the output directory
// const rendererAddon = require(path.join(__dirname, "../build/Release/addon.node"));

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),  // Updated to match output filename
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:4200");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/angular-app/browser/index.html"));
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// Example IPC communication with renderer
// ipcMain.handle("renderer-initialize", () => rendererAddon.initialize());
// ipcMain.handle("renderer-update", (_, deltaTime: number) => rendererAddon.update(deltaTime));
// ipcMain.handle("renderer-setParameter", (_, param: number) => rendererAddon.setParameter(param));
// ipcMain.handle("renderer-cleanup", () => rendererAddon.cleanup());