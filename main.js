const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 380,
        height: 720,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');

    // Функция закрепления окна поверх остальных
    ipcMain.on('set-on-top', (event, mode) => {
        win.setAlwaysOnTop(mode);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
