let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');

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
    statusText.textContent = isWorkTime 
        ? 'Time to focus \u{1F913}'  // 🤓
        : 'Time for a break \u{1F973}';  // 🥳
    modeToggleButton.textContent = isWorkTime ? 'Break' : 'Work';
    startButton.textContent = isWorkTime ? 'Start Work' : 'Start Break';
    updateTimer();
}

function startTimer() {
    if (timerId === null) {
        if (!timeLeft) {
            timeLeft = 25 * 60;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work session complete! Take a break!');
            }
        }, 1000);
        startButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateTimer();
    startButton.disabled = false;
}

// Event Listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
    switchMode();
});

// Initialize the timer
resetTimer();
startButton.textContent = 'Start Work';  // Set initial text 
statusText.textContent = 'Time to focus 🤓';  // Set initial status text 

// Set initial title
document.title = '25:00 - Focus Timer'; 