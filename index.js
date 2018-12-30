'use strict';

const { app, BrowserWindow } = require('electron');

const isFirstInstance = app.requestSingleInstanceLock();
if (!isFirstInstance) {
    app.quit();
}

// Adds hotkeys for triggering dev tools and reload.
require('electron-debug')();

let mainWindow;

const createMainWindow = () => {
    const win = new BrowserWindow({
        width  : 600,
        height : 400
    });

    win.loadFile('index.html');

    win.on('closed', () => {
        // Help the window be garbage collected.
        mainWindow = null;
    });

    return win;
};

app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }

        mainWindow.show();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.whenReady().then(() => {
    mainWindow = createMainWindow();
});
