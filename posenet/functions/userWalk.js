const isWalking = (hip) => {
        console.log('Passo');
        timerStateStep = hip.visible = false;
        setTimeout(() => {
            timerStateStep = hip.visible = true;
        }, 1000);
} 