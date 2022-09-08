//! Variáveis constantes
let WIDTH = 480, HEIGHT = 360;
//! Inicialização do posenet e da câmera
let video, poseNet, pose, videoIsOn = false;
//! Sprites (quadrados, mãos, ...)
let squaresGroup, rightHand, leftHand;
//! Estado do temporizador de colisão
let timerState = true;

function preload(){
    video = createCapture(VIDEO);
}

function setup(){
    let canvas = createCanvas(WIDTH, HEIGHT);
    
    squaresGroup = new Group();
        createSquaresGroup();
    rightHand = createSprite(150, 150, 50, 50);
    leftHand = createSprite(150, 150, 50, 50);
}

function draw(){
    noSmooth();
    
    if(!videoIsOn) loadWebcam(video, poseNet);
    else if(videoIsOn){
        showVideo(video);
        if(pose){
            let { leftAnkle, rightAnkle,
                  leftEar, rightEar,
                  leftElbow, rightElbow,
                  leftEye, rightEye,
                  leftHip, rightHip,
                  leftKnee, rightKnee,
                  leftShoulder, rightShoulder,
                  leftWrist, rightWrist,
                  nose
                } = pose;
            
            handsPosition(rightHand, leftHand);
            //? Verificando se o estado do 'timer' está ativo para colisões
                if(timerState) squaresGroupCollision(squaresGroup);

            //console.log(pose);
            //drawSprites(squaresGroup);
            drawSprites();
        }
    }
}

