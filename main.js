leftWrist_X = 0;
leftWrist_Y = 0;

rightWrist_X = 0;
rightWrist_Y = 0;

score_LeftWrist = 0;

song = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");
    if(score_LeftWrist > 0.2){
    circle(leftWrist_X, leftWrist_Y, 20);

    leftWristY_num = Number(leftWrist_Y);
    floored_LWY = floor(leftWristY_num);
    volume = floored_LWY / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function modelLoaded(){
    console.log("PoseNet has successfully been set up.");
}
function gotPoses(results){
    if(results > 0){
        console.log(results);

        leftWrist_X = results[0].pose.leftWrist.x;
        leftWrist_Y = results[0].pose.leftWrist.y;

        rightWrist_X = results[0].pose.rightWrist.x;
        rightWrist_Y = results[0].pose.rightWrist.y;

        score_LeftWrist = results[0].pose.keypoints[9].score;

        console.log("Left wrist X = " + leftWrist_X + " left wrist Y = " + leftWrist_Y);
        console.log("Right wrist X = " + rightWrist_X + " right wrist Y = " + rightWrist_Y);

        console.log("Left wrist Score = " + score_LeftWrist);

    }
}

function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}