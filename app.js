let capture;

function setup() {
  capture = createCapture(VIDEO);
}

function draw() {
    capture.size(windowWidth, windowHeight);
}