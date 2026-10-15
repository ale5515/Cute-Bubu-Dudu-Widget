const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-http-cache');

const isBubu = process.argv.includes('--bubu');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 260,
    height: 220,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const targetFile = isBubu ? 'bubu.html' : 'index.html';
  mainWindow.loadFile(path.join(__dirname, targetFile));
}

// Global IPC listener registered once outside createWindow()
ipcMain.on('close-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.close();
  } else {
    const focusedWin = BrowserWindow.getFocusedWindow();
    if (focusedWin) focusedWin.close();
  }
});

app.whenReady().then(() => {
  const profileFolder = isBubu ? 'temp_user_data_bubu' : 'temp_user_data_dudu';
  app.setPath('userData', path.join(__dirname, profileFolder));
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});