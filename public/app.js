let capture;
let captureButton = document.querySelector('.capture');
let sidebar = document.querySelector('.sidebar');
let ui = document.querySelector('.ui');
let loader = document.querySelector('.logo-loader')
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
       // loop through responses
       loader.classList.add('done'); // hide the loader
       //check if is plant 
       if (res.is_plant && res.fail_cause == null) {
         for (var prop of res.suggestions) {
           console.log(prop.plant_name);

           if (prop.plant_details) {
             prop.plant_details.forEach(detail => {
               console.log(detail);
             })
           }

           if (prop.probability) {
             console.log(prop.probability.toPrecision(2));
           }

           if (prop.similar_images) {
             //loop through the images
             prop.similar_images.forEach(image => {
               console.log(image)
             })
           }
         }
        } else if (res.fail_cause != null) {

        }
        
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
  const data = {
    image: [image],
}
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  
  const res = await fetch('/identify', options)
  .catch(err => console.log)
  return res.json();
}