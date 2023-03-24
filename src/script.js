const { ipcRenderer } = window.require('electron');

window.onload = function () {
  var hours = 00;
  var minutes = 00;
  var seconds = 00;
  var tens = 00; 
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
  var resetButton = document.getElementById("button-reset");
  var closeButton = document.getElementById("button-close");

  function clickBody() {
    if (isPause)
    {
      clockDiv.style.color = 'blue';
      clearInterval(interval);
      interval = setInterval(startTimer, 10);
      isPause = false;
    }
    else{
      clockDiv.style.color = 'red';
      clearInterval(interval);
      isPause = true;
    }
  }

  wrapper.onclick = clickBody;

  closeButton.onclick = function() {
    reset();
    ipcRenderer.send('close',[workedHours, workedMinutes, workedSeconds])
  }
  
  function reset() {
    clearInterval(interval);
    workedSeconds += seconds;
    workedMinutes += minutes;
    workedHours += hours;
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
      workedSecondsElem.innerHTML = "0" + workedSeconds;
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

    isPause = false;
  }

  resetButton.onclick = function() {
    reset()
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