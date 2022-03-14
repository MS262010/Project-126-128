leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

song="";
left_score=0;
right_score=0;
function preload()
{
    spiderman="SM Theme.mp3";
    harryP="HP Theme.mp3";
}

function setup(){
    canvas=createCanvas(600,400)
    canvas.position(460,260);

    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized!')
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
    
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+ " | leftWristY = "+leftWristY);
    
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+ " | rightWristY = "+rightWristY);

        left_score=results[0].pose.keypoints[9].score;
        right_score=results[0].pose.keypoints[10].score;
    }}

function draw(){
    image(video,0,0,600,500);

    noStroke();
    fill("orange");

    if(left_score>0.2){
        circle(leftWristX,leftWristY,30,30);
        
        console.log("Harry Potter "+harryP.isPlaying());
       if(harryP.isPlaying()=="false"){
           harryP.play();
        document.getElementById("song_name").innerHTML="Harry Potter Theme Song is playing"
       }
    }

    if(right_score>0.2){
        circle(rightWristX,rightWristY,30,30);
        
        console.log("Spider Man "+spiderman.isPlaying());
       if(spiderman.isPlaying()=="false"){
           spiderman.play();
          document.getElementById("song_name").innerHTML="Spider Man Theme Song is playing"
       }
    }
}