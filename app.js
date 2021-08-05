let capture;

function setup() {
  capture = createCapture(VIDEO);
}

function draw() {
    capture.size(windowWidth, windowHeight);
}

//function takes a picture
function takePicture() {
    capture.loadPixels();
    captureFrameData = capture.canvas.toDataURL(); //get frame and convert to base64
    return captureFrameData;
}