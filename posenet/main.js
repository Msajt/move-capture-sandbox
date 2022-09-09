//! Variáveis constantes
let WIDTH = 480, HEIGHT = 360;
//! Inicialização do posenet e da câmera
let video, poseNet, pose, videoIsOn = false;
//! Sprites (quadrados, mãos, ...)
let squaresGroup, rightHand, leftHand;
//! Estado do temporizador de colisão
let timerState = true;
//! Calibração da altura do quadril
let calibrateButton, limitHipY = 0;

function preload(){
    video = createCapture(VIDEO);
}

function setup(){
    //? Definição do canvas na tela
    let canvas = createCanvas(WIDTH, HEIGHT);
    
    //? Criação dos sprites
    squaresGroup = new Group();
        createSquaresGroup();
    rightHand = createSprite(150, 150, 50, 50);
    leftHand = createSprite(150, 150, 50, 50);

    //? Botão de recalibrar altura do quadril
    calibrateButton = createButton(`Recalibrar quadril`);
    calibrateButton.position(0, 370);
    calibrateButton.mousePressed(recalibrate);
}

function draw(){
    noSmooth();
    
    //? Verificando se a webcam está ligada
    if(!videoIsOn) loadWebcam(video, poseNet);
    else if(videoIsOn){
        //? Exibição da webcam
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

            //? Posição das mãos na tela
            handsPosition(rightHand, leftHand);
                //? Verificando se o estado do 'timer' está ativo para colisões
                if(timerState) squaresGroupCollision(squaresGroup);

            let hip = {
                x: 480 - (leftHip.x+rightHip.x)/2,
                y: (leftHip.y+rightHip.y)/2,
            };
            let neck = {
                x: 480 - (leftShoulder.x+rightShoulder.x)/2,
                y: (leftShoulder.y+rightShoulder.y)/2,
            };

            //? Angulação do tronco
            chestAngle(neck, hip);
            //? Subida de step
            stepClimb(limitHipY, hip);
            
            //drawSprites(squaresGroup);
            drawSprites();
        }
    }
}

