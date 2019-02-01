'use strict';

const { app, BrowserWindow } = require('electron');
const prepareNext = require('electron-next');
const { is } = require('electron-util');

if (!app.requestSingleInstanceLock()) {
    app.quit();
}

// Adds hotkeys for triggering dev tools and reload.
require('electron-debug')();

let mainWindow;

const createMainWindow = () => {
    const win = new BrowserWindow({
        width  : 1200,
        height : 750
    });

    if (is.development) {
        win.loadURL('http://localhost:8000/');
    }
    else {
        win.loadFile('renderer/out/index.html');
    }

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

app.whenReady().then(async () => {
    await prepareNext('./renderer');
    mainWindow = createMainWindow();
});
