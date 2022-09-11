const resetKneeCollision = (hip, timer) => {
    setTimeout(
        () => timerStateStep = hip.visible = true
    , timer);
}

const isWalking = (hip, timer) => {
        console.log('Passo');
        timerStateStep = hip.visible = false;
        resetKneeCollision(hip, timer);
        
}

const kneesCollision = (hip) => {
    hip.overlap(rightKneeSprite, () => isWalking(hip, 1000));
    hip.overlap(leftKneeSprite , () => isWalking(hip, 1000));
}