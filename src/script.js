const { ipcRenderer } = window.require('electron');
const fs = window.require('fs');

window.onload = function () {
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  var tens = 0; 
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var appendMinutes = document.getElementById("minutes")
  var appendhours = document.getElementById("hours")

  var workedSeconds = 0;
  var workedMinutes = 0;
  var workedHours = 0;
  var workedSecondsElem = document.getElementById("worked-seconds");
  var workedMinutesElem = document.getElementById("worked-minutes");
  var workedHoursElem = document.getElementById("worked-hours");

  var interval;
  var isPause = true;

  var wrapper = document.getElementsByClassName('wrapper')[0]
  var clockDiv = document.getElementById("clock");
  var closeButton = document.getElementById("button-close");
  var fileName = 'WorkTrackSave.txt'

  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) throw err;
    if (data)
    {
      var dataObject = data.split('\n');
      var lastData = dataObject[dataObject.length-2];

      if (getTodayDate() == lastData.split(":")[0]) {
        workedHours = parseInt(lastData.split(":")[1])
        workedMinutes = parseInt(lastData.split(":")[2])
        workedSeconds = parseInt(lastData.split(":")[3])
      }
    }
    reset();
  });

  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return formattedToday = mm + '/' + dd + '/' + yyyy;
  }

  function clickBody() {
    if (isPause)
    {
      clockDiv.style.color = '#00e7ff';
      clearInterval(interval);
      interval = setInterval(startTimer, 10);
      isPause = false;
    }
    else{
      clockDiv.style.color = '#e74689';
      clearInterval(interval);
      isPause = true;
    }
  }

  wrapper.onclick = clickBody;
  wrapper.ondblclick = reset;

  closeButton.onclick = function() {
    reset();
    ipcRenderer.send('close', [workedHours, workedMinutes, workedSeconds])
  }
  
  function reset() {
    clearInterval(interval);
    workedSeconds += parseInt(seconds);
    workedMinutes += parseInt(minutes);
    workedHours += parseInt(hours);
    tens = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    appendTens.innerHTML = "0" + tens;
    appendSeconds.innerHTML = ":0" + seconds;
    appendMinutes.innerHTML = "0" + minutes;
    appendhours.innerHTML = "0" + hours;
    
    if (workedSeconds >= 60)
    {
      workedMinutes += 1;
      workedSeconds -= 60;
    }
    if (workedMinutes >= 60)
    {
      workedHours += 1;
      workedMinutes -= 60;
    }

    if (workedSeconds <= 9){
      workedSecondsElem.innerHTML = "0" +  workedSeconds;
    } else {
      workedSecondsElem.innerHTML = workedSeconds;
    }

    if (workedMinutes <= 9){
      workedMinutesElem.innerHTML = "0" + workedMinutes;
    } else {
      workedMinutesElem.innerHTML = workedMinutes;
    }

    if (workedHours <= 9){
      workedHoursElem.innerHTML = "0" + workedHours;
    } else {
      workedHoursElem.innerHTML = workedHours;
    }

    clockDiv.style.color = '#e74689';
    isPause = true;
  }

  function startTimer () {
    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = ":0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = ":" + seconds;
    }
  
    if (seconds > 59) {
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = ":0" + 0;
    }

    if (minutes > 9){
      appendMinutes.innerHTML = minutes;
    }

    if (minutes > 59)
    {
      hours++;
      appendhours.innerHTML = "0" + hours;
      minutes = 0;
      appendMinutes.innerHTML = "0" + 0;
    }

    if (hours > 9)
    {
      appendhours.innerHTML = hours;
    }
  }
}