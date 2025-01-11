let timeLeft;
let timerId = null;
let isWorkTime = true;
let isPaused = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const pauseButton = document.getElementById('pause');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    document.title = `${timeString} - Focus Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? 'Time to focus \u{1F913}' : 'Time for a break \u{1F973}';
    startButton.textContent = isWorkTime ? 'Start Work' : 'Start Break';
    document.getElementById('mode-toggle').checked = !isWorkTime;
    updateTimer();
}

function startTimer() {
    if (timerId === null) {
        if (!timeLeft) {
            timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
        }
        
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work session complete! Take a break!');
                startButton.disabled = false;
                pauseButton.disabled = true;
                startButton.textContent = isWorkTime ? 'Start Work' : 'Start Break';
            }
        }, 1000);
        
        startButton.disabled = true;
        pauseButton.disabled = false;
        isPaused = false;
    }
}

function pauseTimer() {
    if (!isPaused) {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        isPaused = true;
        pauseButton.textContent = 'Resume';
    } else {
        // Resume the timer
        startTimer();
        pauseButton.textContent = 'Pause';
        isPaused = false;
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isPaused = false;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateTimer();
    startButton.disabled = false;
    pauseButton.disabled = true;
    startButton.textContent = isWorkTime ? 'Start Work' : 'Start Break';
    pauseButton.textContent = 'Pause';
}

// Add event listeners
pauseButton.addEventListener('click', pauseTimer);
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize button states
pauseButton.disabled = true;
document.title = '25:00 - Focus Timer';

// Initialize timeLeft when the page loads
timeLeft = 25 * 60;  // Start with 25 minutes
updateTimer();  // Update the display immediately 