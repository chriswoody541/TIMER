let timerElement = document.getElementById('timer');
let timeInput = document.getElementById('timeInput');
let countdown;
let isPaused = true;
let targetTime;

function startCountdown() {
  targetTime = new Date();
  let inputTime = timeInput.value.split(':');
  targetTime.setHours(inputTime[0]);
  targetTime.setMinutes(inputTime[1]);
  targetTime.setSeconds(0);

  let currentTime = new Date();

  if (targetTime <= currentTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  let timeDiff = targetTime.getTime() - currentTime.getTime();
  timeDiff = Math.floor(timeDiff / 1000); // Convert to seconds

  if (isPaused) {
    isPaused = false;
    toggleDisplay();
    countdown = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  let currentTime = new Date();
  let timeDiff = Math.floor((targetTime - currentTime) / 1000); // Convert to seconds

  if (timeDiff <= 0) {
    clearInterval(countdown);
    timerElement.innerHTML = "00:00";
  } else {
    let minutes = Math.floor(timeDiff / 60);
    let seconds = timeDiff % 60;

    let displayTime = "";

    if (minutes < 10) {
      displayTime += '0';
    }
    displayTime += minutes + ":";

    if (seconds < 10) {
      displayTime += '0';
    }
    displayTime += seconds;

    timerElement.innerHTML = displayTime;
  }
}

function pauseResumeCountdown() {
  if (isPaused) {
    isPaused = false;
    countdown = setInterval(updateTimer, 1000);
    document.getElementById('buttons').style.display = "none";
  } else {
    isPaused = true;
    clearInterval(countdown);
    document.getElementById('buttons').style.display = "block";
  }
}

function restartCountdown() {
  toggleDisplay();
}

function toggleDisplay() {
  let startupDisplay = document.getElementById('startupDisplay');
  let countdownDisplay = document.getElementById('countdownDisplay');

  startupDisplay.style.display = isPaused ? "block" : "none";
  countdownDisplay.style.display = isPaused ? "none" : "block";
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    pauseResumeCountdown();
  }
});
