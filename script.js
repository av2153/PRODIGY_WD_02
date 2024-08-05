let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 1000 / 60);
    isRunning = true;
    startStopBtn.textContent = 'Pause';
}

function stopStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    difference = 0;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.textContent = `Lap ${++lapCounter}: ${formatTime(difference)}`;
        lapTime.classList.add('lap');
        lapsContainer.appendChild(lapTime);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    const time = new Date(ms);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
