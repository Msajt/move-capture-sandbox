//! Exibe a moeda novamente no canvas
const resetCoinCollision = (square, timer, time) => {
	setTimeout(() => {
		timer.coin = square.visible = true;
	}, time);
}

//! Verifica qual moeda foi pega e dá um intervalo entre as colisões
const isTouchingCoins = (square, index, timer, time) => {
	(index < 5) ?
		( console.log(`Testando colisão esquerda: ${index+1}`) ) :
		// gameInstance.SendMessage("Player", "PlayerInclination", "L" + (index+1)) ) :
		( console.log(`Testando colisão direita: ${(index-5)+1}`) );
		// gameInstance.SendMessage("Player", "PlayerInclination", "R" + ((index-5)+1)) )
	timer.coin = square.visible = false;
    //collisions++;
	//coinSound.play();
    //    console.log(`Colisões: ${collisions}`);
	resetCoinCollision(square, timer, time);	
}

//! Verifica se houve colisão e invoca a função
const squaresGroupCollision = (squares, timer) => {
    //? Laço pegando todos os quadrados da tela
    squares.forEach((sqr, ind) => {
        //? Verificando a direção [ ind < 5 ? esquerda : direita ]
        (ind < 5) ?
            //? Verificando colisões
            sqr.overlap(leftHand, () => {
                //? Inverte o estado do 'timer' por certo tempo e chama função do
                isTouchingCoins(sqr, ind, timer, 1000);
            }) :
            sqr.overlap(rightHand, () => {
                isTouchingCoins(sqr, ind, timer, 1000);
            })
    });
}