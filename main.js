const { app, BrowserWindow } = require("electron");
const {ipcMain} = require('electron')

ipcMain.on('close',(e, args)=> {
  const fs = require('fs');
  try {
    var result;
    var data = fs.readFileSync('myfile.txt', {encoding: 'utf8', flag:'r'});
    if (data)
    {
      var dataObject = data.split('\n');
      var lastData = dataObject[dataObject.length-2];

      if (getTodayDate() == lastData.split(":")[0]) {
        result = dataObject.splice(dataObject.length-2, 0).join('\n');;
        fs.writeFileSync('myfile.txt', result, 'utf-8');
      }
    }
    fs.appendFileSync('myfile.txt', getTodayDate() + ":" + String(args[0]) + ":" + String(args[1]) + ":" + String(args[2]) + "\n");
  }
  catch(e) { 
    console.log(e) 
  }
  app.quit();
})

app.whenReady().then(createWindow);

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 130,
    resizable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    transparent:true
  });
  win.setAlwaysOnTop(true, 'screen');
  win.loadFile("src/index.html");
}

function getTodayDate() {
  const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return formattedToday = mm + '/' + dd + '/' + yyyy;
}