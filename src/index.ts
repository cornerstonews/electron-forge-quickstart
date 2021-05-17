import { app, BrowserWindow } from "electron";
import * as path from "path";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

class ElectronMain {
    public constructor() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on("ready", () => this.createWindow());

        // Quit when all windows are closed, except on macOS. There, it's common
        // for applications and their menu bar to stay active until the user quits
        // explicitly with Cmd + Q.
        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });

        app.on("activate", () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow();
            }
        });
    }

    public createWindow(): void {
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            height: 600,
            width: 800,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
            },
        });

        // and load the index.html of the app.
        //mainWindow.loadFile('index.html')
        mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        // Open the DevTools.
        // mainWindow.webContents.openDevTools();
    }
}

new ElectronMain();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
