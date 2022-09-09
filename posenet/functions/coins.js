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