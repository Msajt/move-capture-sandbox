//! Variáveis constantes
const WIDTH = 480, HEIGHT = 360;
//! Inicialização do posenet e da câmera
let video, poseNet, pose, videoIsOn = false;
//! Sprites (quadrados, mãos, ...)
let squaresGroup,
    rightHand, leftHand,
    rightKneeSprite, leftKneeSprite,
    hipSprite;
//! Estado do temporizador de colisão
let timerState = true;
let timerStateStep = true;
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
    rightHand       = createSprite(150, 150, 50, 50);
    leftHand        = createSprite(150, 150, 50, 50);
    rightKneeSprite = createSprite(150, 150, 30, 30);
    leftKneeSprite  = createSprite(150, 150, 30, 30);
    hipSprite       = createSprite(150, 150, 100, 30);
    leftHipSprite   = createSprite(150, 150, 30, 30);

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
                x: WIDTH - (leftHip.x+rightHip.x)/2,
                y: (leftHip.y+rightHip.y)/2,
            };
            let neck = {
                x: WIDTH - (leftShoulder.x+rightShoulder.x)/2,
                y: (leftShoulder.y+rightShoulder.y)/2,
            };
            let knees = {
                xR: WIDTH - rightKnee.x,
                yR: Number(rightKnee.y),
                xL: WIDTH - leftKnee.x,
                yL: Number(leftKnee.y),
            };

            rightKneeSprite.position.x = knees.xR;
            rightKneeSprite.position.y = knees.yR;
            leftKneeSprite.position.x  = knees.xL;
            leftKneeSprite.position.y  = knees.yL;

            hipSprite.position.x = hip.x;
            hipSprite.position.y = hip.y + 30;
            hipSprite.width = abs(leftHip.x-rightHip.x)*2;

            if(timerStateStep){
                hipSprite.overlap(rightKneeSprite, () => isWalking(hipSprite));
                hipSprite.overlap(leftKneeSprite,  () => isWalking(hipSprite));
            }

            //? Angulação do tronco
            chestAngle(neck, hip);
            //? Subida de step
            stepClimb(limitHipY, hip);
            
            //drawSprites(squaresGroup);
            drawSprites();
        }
    }
}

