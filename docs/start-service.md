# BlueMote service

Start the Bluetooth UART service and begin reading BlueMote gamepad packets.

```sig
bluemote.startService()
```

Put this block in **on start**. It only needs to run once.

This extension uses open (no-pairing) Bluetooth. In MakeCode, choose **Gear → Project Settings → No pairing required** and download again if the micro:bit still asks to pair.

Requires a **micro:bit v2**. The original micro:bit does not have enough RAM for Bluetooth UART.

## Example

Start the service, then plot the left stick Y axis on the LED screen.

```blocks
bluemote.startService()
basic.forever(function () {
    led.plotBarGraph(bluemote.stickValue(BlueMoteStick.LeftY), 100)
})
```

## See also

* [button is pressed](./button-is-pressed)
* [stick value](./stick-value)

```package
bluemote=github:AntonsMindstorms/pxt-bluemote
```
