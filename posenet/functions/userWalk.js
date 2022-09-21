const resetKneeCollision = (hip, timer, time) => {
    setTimeout(
        () => timer.step = hip.visible = true
    , time);
}

const isWalking = (hip, timer, time) => {
        console.log('Passo');
        
        //TODO Colocar a função ' gameInstance.SendMessage() '
            // Coloque aqui a função

        timer.step = hip.visible = false;
        resetKneeCollision(hip, timer, time);
        
}

const kneesCollision = (hip, timer) => {
    hip.overlap(rightKneeSprite, () => isWalking(hip, timer, 1000));
    hip.overlap(leftKneeSprite , () => isWalking(hip, timer, 1000));
}