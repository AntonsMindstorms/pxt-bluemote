// Simulator-safe test: no extra motor extension required.
bluemote.startService()
basic.forever(function () {
    if (bluemote.buttonIsPressed(BlueMoteButton.A)) {
        basic.showString("Honk!")
    } else {
        led.plotBarGraph(bluemote.stickValue(BlueMoteStick.LeftY), 100)
    }
})
