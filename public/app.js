let capture;
let captureButton = document.querySelector('.capture');
let sidebar = document.querySelector('.sidebar');
let ui = document.querySelector('.ui');

function setup() {
  capture = createCapture(VIDEO);
}

function draw() {
    capture.size(windowWidth, windowHeight);
}

// on click
ui.addEventListener('click', (ev) => {
  if(ev.target.parentElement.classList.contains('capture')) {
    sidebar.classList.add('show'); // show sidebar
  } else if (ev.target.classList.contains('ui') || ev.target.classList.contains('logo')) {
    sidebar.classList.remove('show'); // show sidebar
  }
  //todo: send image to identification
})

//function takes a picture
function takePicture() {
    capture.loadPixels();
    captureFrameData = capture.canvas.toDataURL(); //get frame and convert to base64
    return captureFrameData;
}