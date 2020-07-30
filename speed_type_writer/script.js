const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");



// created an array for hundredths of min, seconds and ms.
var timer = [0,0,0,0];
var interval;
var timeRunning = false;
var errors = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
  if(time <=9){
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
theTimer.innerHTML = currentTime;
timer[3]++;

//each digits split
timer[0] = Math.floor((timer[3]/100)/60);
timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
timer[2] = Math.floor(timer[3] - (timer[1] * 100) -(timer[0] *  6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
  let textEntered = testArea.value;
   let originTextMatch = originText.substring(0, textEntered.length);
//when complete string matches show green outline
  if (textEntered == originText){
    clearInterval(interval);
    testWrapper.style.borderColor = "green";
  }else{//when each chars is matching as typing show blue
    if (textEntered == originTextMatch){
      testWrapper.style.borderColor = "blue";
    }else{//if incorrect char entered show red
      testWrapper.style.borderColor = "red";
      errors++;
      document.querySelector("#errors-text p").innerHTML= "Number of errors made so for: " + errors;
    }
  }
}

// Start the timer:
function start(){

  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timeRunning){
    timeRunning = true;
  interval = setInterval(runTimer, 10);
  }

  console.log(textEnteredLength);
}

// Reset everything:
function reset(){
  console.log("Reset button has been pressed");
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timeRunning = false;

  testArea.value = "";
  theTimer.innerHTML= "00:00:00";
  testWrapper.style.borderColor = "grey";
  errors = 0;
    document.querySelector("#errors-text p").innerHTML= "";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
