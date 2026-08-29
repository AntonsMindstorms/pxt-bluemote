bluemote.startService()
basic.forever(function () {
    if (bluemote.buttonIsPressed(BlueMoteButton.A)) {
        basic.showIcon(IconNames.Heart)
    } else {
        led.plotBarGraph(bluemote.stickValue(BlueMoteStick.LeftY), 100)
    }
})
