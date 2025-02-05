const { app, BrowserWindow } = require('electron');
require('./core');

const isDevelopment = process.argv
    .slice(1)
    .some((argument) => argument === '--serve');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 730,
        minHeight: 680,
        minWidth: 1200,
        title: 'App Outlet',
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (isDevelopment) {
        require('electron-reload')(__dirname, {
            electron: require('electron'),
        });

        win.loadURL('http://localhost:4200');
    } else {
        win.loadFile(`${__dirname}/dist/app-outlet/index.html`);
        win.setMenuBarVisibility(false);
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
