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
captureButton.addEventListener('click', (ev) => {
  sidebar.classList.add('show'); // show sidebar
  //todo: send image to identification
})

//when click off the sidebar
ui.addEventListener('click',() => {
  if(sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
  }
})

//function takes a picture
function takePicture() {
    capture.loadPixels();
    captureFrameData = capture.canvas.toDataURL(); //get frame and convert to base64
    return captureFrameData;
}