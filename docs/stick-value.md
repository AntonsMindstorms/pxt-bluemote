# stick value

Stick axis value from **-100 to 100**.

```sig
bluemote.stickValue(BlueMoteStick.LeftY)
```

## Parameters

* **axis**: which stick axis to read: left X, left Y, right X, or right Y

Y is screen-style: **down is positive**. Invert in your program if the robot should treat up as forward: `0 - stick left Y value`.

## Example

Plot the left stick Y axis as a bar graph.

```blocks
bluemote.startService()
basic.forever(function () {
    led.plotBarGraph(bluemote.stickValue(BlueMoteStick.LeftY), 100)
})
```

## See also

* [BlueMote service](./start-service)
* [button is pressed](./button-is-pressed)

```package
bluemote=github:AntonsMindstorms/pxt-bluemote
```
