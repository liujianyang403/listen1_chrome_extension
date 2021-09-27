import electron from 'electron';

const { app, BrowserWindow } = electron;
import isDev from './isDev';
import reloader from 'electron-reloader';
import { fixCORS } from './cors';
isDev && reloader(module);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  fixCORS();
  const transparent = false;
  const width = 1000;
  const height = 670;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minHeight: 300,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    //icon: iconPath,
    titleBarStyle: 'hiddenInset',
    transparent: transparent,
    vibrancy: 'light',
    frame: false,
    hasShadow: true
  });
  // and load the index.html of the app.
  const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36';

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`, { userAgent: ua });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.