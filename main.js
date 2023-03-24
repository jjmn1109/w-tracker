const { app, BrowserWindow } = require("electron");
const {ipcMain} = require('electron')

ipcMain.on('close',(workedHours, workedMinutes, workedSeconds)=> {
  const fs = require('fs');
  try { fs.writeFileSync('myfile.txt', workedHours+":"+workedMinutes+":"+workedSeconds, 'utf-8'); }
  catch(e) { alert('Failed to save the file !'); }
  app.quit();
})

app.whenReady().then(createWindow);

function createWindow() {
  const win = new BrowserWindow({
    width: 288,
    height: 115,
    resizable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  });
  win.webContents.openDevTools(); 
  win.setAlwaysOnTop(true, 'screen');
  win.loadFile("src/index.html");
}