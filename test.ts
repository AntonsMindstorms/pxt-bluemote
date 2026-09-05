/**
 * BlueMote hardware test. Safe in the simulator (Bluetooth is not simulated).
 *
 * Setup
 * - micro:bit v2
 * - Gear → Project Settings → No pairing required
 * - Download, then connect from the BlueMote app (clear the name filter, or
 *   set it to the advertised BBC micro:bit [xxxxx] name)
 *
 * Pass
 * - Left stick Y moves the LED bar graph (down increases the bar)
 * - BlueMote A shows "A", B shows "B", up shows a north arrow
 * - Right stick X changes which LED column is plotted when no button is held
 *
 * Fail
 * - Sad face / 020: out of memory (use v2, not v1)
 * - 927: this hex is v2-only, flashed to a v1
 * - Graph never moves: not connected, pairing still required, or an old
 *   BlueMote build that only writes UART without response
 */
bluemote.startService()

// Compile-time coverage of every exported API and enum member.
function coverAllApis(): boolean {
    let buttons =
        bluemote.buttonIsPressed(BlueMoteButton.Up) ||
        bluemote.buttonIsPressed(BlueMoteButton.Down) ||
        bluemote.buttonIsPressed(BlueMoteButton.Left) ||
        bluemote.buttonIsPressed(BlueMoteButton.Right) ||
        bluemote.buttonIsPressed(BlueMoteButton.A) ||
        bluemote.buttonIsPressed(BlueMoteButton.B) ||
        bluemote.buttonIsPressed(BlueMoteButton.X) ||
        bluemote.buttonIsPressed(BlueMoteButton.Y)
    let sticks =
        bluemote.stickValue(BlueMoteStick.LeftX) +
        bluemote.stickValue(BlueMoteStick.LeftY) +
        bluemote.stickValue(BlueMoteStick.RightX) +
        bluemote.stickValue(BlueMoteStick.RightY)
    return buttons || sticks != 0
}

basic.forever(function () {
    coverAllApis()
    if (bluemote.buttonIsPressed(BlueMoteButton.A)) {
        basic.showString("A")
    } else if (bluemote.buttonIsPressed(BlueMoteButton.B)) {
        basic.showString("B")
    } else if (bluemote.buttonIsPressed(BlueMoteButton.Up)) {
        basic.showArrow(ArrowNames.North)
    } else {
        led.plotBarGraph(bluemote.stickValue(BlueMoteStick.LeftY), 100)
        led.plot(Math.map(bluemote.stickValue(BlueMoteStick.RightX), -100, 100, 0, 4), 0)
    }
})
