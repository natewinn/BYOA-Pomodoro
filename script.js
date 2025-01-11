let timeLeft;
let timerId = null;
let isWorkTime = true;
let isPaused = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggle = document.getElementById('mode-toggle');
const pauseButton = document.getElementById('pause');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    document.title = `${timeString} - Focus Timer`;
}

function updateModeDisplay() {
    const workLabel = document.querySelector('.mode-label[data-mode="work"]');
    const breakLabel = document.querySelector('.mode-label[data-mode="break"]');
    
    if (isWorkTime) {
        workLabel.classList.add('active');
        breakLabel.classList.remove('active');
        timeLeft = 25 * 60;
        minutesDisplay.textContent = "25";
    } else {
        breakLabel.classList.add('active');
        workLabel.classList.remove('active');
        timeLeft = 5 * 60;
        minutesDisplay.textContent = "05";
    }
    
    secondsDisplay.textContent = "00";
    modeToggle.checked = !isWorkTime;
    startButton.textContent = isWorkTime ? 'Start Work' : 'Start Break';
    statusText.textContent = isWorkTime ? 'Time to focus \u{1F913}' : 'Time for a break \u{1F973}';
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
        clearInterval(timerId);
        timerId = null;
        isPaused = true;
        pauseButton.textContent = 'Resume';
    } else {
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

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    
    if (isWorkTime) {
        minutesDisplay.textContent = "25";
    } else {
        minutesDisplay.textContent = "05";
    }
    secondsDisplay.textContent = "00";
    
    updateModeDisplay();
    updateTimer();
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

modeToggle.addEventListener('change', (e) => {
    if (timerId === null) {
        isWorkTime = !e.target.checked;
        
        if (isWorkTime) {
            timeLeft = 25 * 60;
            minutesDisplay.textContent = "25";
            secondsDisplay.textContent = "00";
        } else {
            timeLeft = 5 * 60;
            minutesDisplay.textContent = "05";
            secondsDisplay.textContent = "00";
        }
        
        updateModeDisplay();
        updateTimer();
        document.title = `${isWorkTime ? '25:00' : '05:00'} - Focus Timer`;
    } else {
        e.preventDefault();
        modeToggle.checked = !isWorkTime;
    }
});

// Initialize
updateModeDisplay();
timeLeft = 25 * 60;
updateTimer();
pauseButton.disabled = true; 