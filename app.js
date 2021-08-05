let capture;
let captureButton = document.querySelector('.capture');
let sidebar = document.querySelector('.sidebar');

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

//function takes a picture
function takePicture() {
    capture.loadPixels();
    captureFrameData = capture.canvas.toDataURL(); //get frame and convert to base64
    return captureFrameData;
}