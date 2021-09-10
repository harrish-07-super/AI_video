video = "";
status = "";
object = [];

function preload() {
  video = createVideo("video.mp4");
  video.hide();
}

function setup() {
  canvas = createCanvas(600, 400);
  canvas.center();
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {
  console.log("Model is loaded!@#");
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotresult(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(results);
    object = results;
  }
}

function draw() {
  image(video, 0, 0, 600, 400);

  if (status != "") {
    objectDetector.detect(video, gotresult);

    for (i = 0; i < object.length; i++) {
      document.getElementById("status").innerHTML = "Status : Objects Detected";
      document.getElementById("number_of_object").innerHTML = "Number of objects detected: " + object.length;

      fill("red");
      stroke("brown");
      noFill();

      percent = floor(object[i].confidence * 100);

      text(object[i].label + percent + "%", object[i].x, object[i].y);

      rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
  }

}
