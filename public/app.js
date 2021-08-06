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
    
    //send post request to endpoint and attach image
    let base64Img = takePicture();
    sendRequest(base64Img).then(res => {
      console.log(res);
    });
  } else if (ev.target.classList.contains('ui') || ev.target.classList.contains('logo')) {
    sidebar.classList.remove('show'); // show sidebar
  }
})

//function takes a picture
function takePicture() {
    capture.loadPixels();
    captureFrameData = capture.canvas.toDataURL(); //get frame and convert to base64
    return captureFrameData;
}

async function sendRequest(image) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(image)
  };
  const res = await fetch('/identify', options)
  const json = res.json(); // convert to json
  return json;
}