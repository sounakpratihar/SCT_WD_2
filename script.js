let intervalId;
let isRunning = false;
let seconds = 0;
let lapCount = 0;
let lapTimes = [];

const displayElement = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTimesElement = document.getElementById('lap-times');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLapTime);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetStopwatch() {
    seconds = 0;
    lapCount = 0;
    lapTimes = [];
    updateDisplay();
    lapTimesElement.innerHTML = '';
    clearInterval(intervalId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function recordLapTime() {
    if (isRunning) {
        lapCount++;
        const lapTime = formatTime(seconds);
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapTimesElement.appendChild(lapElement);
    }
}

function updateDisplay() {
    displayElement.textContent = formatTime(seconds);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsDisplay = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(secondsDisplay)}`;
}

function padZero(value) {
    return (value < 10 ? '0' : '') + value;
}