const resetCollision = (sprite, timer, time) => {
    setTimeout(
        () => timer.step = sprite.visible = true
    , time);
}