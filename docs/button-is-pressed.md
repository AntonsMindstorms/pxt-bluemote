# button is pressed

`true` while the given BlueMote button is held down.

```sig
bluemote.buttonIsPressed(BlueMoteButton.A)
```

## Parameters

* **btn**: the BlueMote button to check: up, down, left, right, A, B, X, or Y

## Example

Show `Honk!` while BlueMote button A is pressed. Otherwise plot the left stick Y axis.

```blocks
bluemote.startService()
basic.forever(function () {
    if (bluemote.buttonIsPressed(BlueMoteButton.A)) {
        basic.showString("Honk!")
    } else {
        led.plotBarGraph(bluemote.stickValue(BlueMoteStick.LeftY), 100)
    }
})
```

## See also

* [BlueMote service](./start-service)
* [stick value](./stick-value)

```package
bluemote=github:AntonsMindstorms/pxt-bluemote
```
