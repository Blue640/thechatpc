const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    // Создаем окно рации
    const win = new BrowserWindow({
        width: 380,
        height: 720,
        resizable: false, // Запрещаем менять размер для сохранения дизайна
        autoHideMenuBar: true, // Убираем верхнее меню (Alt, File и т.д.)
        icon: path.join(__dirname, 'icon.ico'), // Если сделаешь иконку
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Загружаем твой HTML файл
    win.loadFile('index.html');

    // ОБРАБОТЧИК ДЛЯ КНОПКИ PIN (ПОВЕРХ ВСЕХ ОКОН)
    ipcMain.on('set-on-top', (event, mode) => {
        console.log("Always on top mode:", mode);
        win.setAlwaysOnTop(mode);
    });
}

// Запуск приложения
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Закрытие приложения
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});