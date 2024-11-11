const toggleButton = document.getElementById("toggleBtn");
const resultDiv = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

let isRecording = false;
let recognition;
let timerInterval;
let seconds = 0;
let finalTranscript = ""; 
function startTimer() {
    seconds = 0; 
    timerDisplay.textContent = "00:00"; 
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}


if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ar-SA"; 

    recognition.onstart = () => {
        isRecording = true;
        toggleButton.textContent = "🟥 إيقاف التسجيل";
        startTimer();
    };

    recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + " "; 
            }
        }
        resultDiv.innerHTML = finalTranscript; 
    };

    recognition.onend = () => {
        isRecording = false;
        toggleButton.textContent = "🔴 ابدأ التسجيل"; 
        stopTimer()
    };

    toggleButton.addEventListener("click", () => {
        if (isRecording) {
            recognition.stop();
        } else {
            finalTranscript = ""; 
            resultDiv.innerHTML = ""; 
            recognition.start();
        }
    });
}
