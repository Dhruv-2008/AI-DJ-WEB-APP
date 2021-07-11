song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
slw = 0;
srw = 0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center;
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(srw > 0.2){
    circle(leftWristx, leftWristy, 20);
    if(leftWristy > 0 && leftWristy <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } 
    else if(leftWristy > 100 && leftWristy <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1x";
    song.rate(1);
} 
else if(leftWristy > 200 && leftWristy <= 300){
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
}
else if(leftWristy > 300 && leftWristy <= 400){
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
}
else if(leftWristy > 400 && leftWristy <= 500){
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    song.rate(2.5);
}
}
    if(slw > 0.2){
    circle(rightWristx, rightWristy, 20);

    convertyToy = Number(rightWristy);
    removedDeimal = floor(convertyToy);
    volume = removedDeimal/500;
    document.getElementById("volume").innerHTML = "volume = "+volume;
    song.setVolume(volume);

}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("Model is Loaded!");
}

function gotPoses(results){
if (results.length>0){
    console.log(results);
    slw = results[0].pose.keypoints[10].score;
    srw = results[0].pose.keypoints[9].score;
    leftWristx = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;
    rightWristx = results[0].pose.rightWrist.x;
    rightWristy = results[0].pose.rightWrist.y;
}
}