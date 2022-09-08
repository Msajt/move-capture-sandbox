const createSquaresGroup = () => {
    for(let i=0; i<10; i++){
        let square;
        (i < 5) ?
            ( square = createSprite(40, 70*(i+1)-20, 50, 50) ) :
            ( square = createSprite(480-40, 70*((i-5)+1)-20, 50, 50) )
        
        //square.addImage('coinImage', coinImage);
        squaresGroup.add(square);
    }
}

//! Funções para a posição das mãos (direita, esquerda e ambas)
const rightHandPosition = (r) => {
    let { rightWrist } = pose;
	r.position.x = WIDTH - rightWrist.x;
	r.position.y = rightWrist.y;
}

const leftHandPosition = (l) => {
    let { leftWrist } = pose;
	l.position.x = WIDTH - leftWrist.x;
	l.position.y = leftWrist.y;	
}

const handsPosition = (r, l) => {
	rightHandPosition(r);
	leftHandPosition(l);	
}

//! Exibe a moeda novamente no canvas
const resetCollision = (square) => {
	setTimeout(() => {
		timerState = square.visible = true;
	}, 1000);
}

//! Verifica qual moeda foi pega e dá um intervalo entre as colisões
const collisionInterval = (square, index) => {
	(index < 5) ?
		( console.log(`Testando colisão esquerda: ${index+1}`) ) :
		// gameInstance.SendMessage("Player", "PlayerInclination", "L" + (index+1)) ) :
		( console.log(`Testando colisão direita: ${(index-5)+1}`) );
		// gameInstance.SendMessage("Player", "PlayerInclination", "R" + ((index-5)+1)) )
	timerState = square.visible = false;
    //collisions++;
	//coinSound.play();
    //    console.log(`Colisões: ${collisions}`);
	resetCollision(square);	
}

//! Verifica se houve colisão e invoca a função
const squaresGroupCollision = (squares) => {
    //? Laço pegando todos os quadrados da tela
    squares.forEach((sqr, ind) => {
        //? Verificando a direção [ ind < 5 ? esquerda : direita ]
        (ind < 5) ?
            //? Verificando colisões
            sqr.overlap(leftHand, () => {
                //? Inverte o estado do 'timer' por certo tempo e chama função do
                collisionInterval(sqr, ind);
            }) :
            sqr.overlap(rightHand, () => {
                collisionInterval(sqr, ind);
            })
    });
}