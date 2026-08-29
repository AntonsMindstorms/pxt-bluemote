/**
 * BlueMote gamepad buttons. Bit positions match the app packet.
 */
enum BlueMoteButton {
    //% block="up"
    Up = 0,
    //% block="down"
    Down = 1,
    //% block="left"
    Left = 2,
    //% block="right"
    Right = 3,
    //% block="A"
    A = 4,
    //% block="B"
    B = 5,
    //% block="X"
    X = 6,
    //% block="Y"
    Y = 7,
}

/**
 * BlueMote stick axes. Values are -100 to 100.
 */
enum BlueMoteStick {
    //% block="left X"
    LeftX = 0,
    //% block="left Y"
    LeftY = 1,
    //% block="right X"
    RightX = 2,
    //% block="right Y"
    RightY = 3,
}

/**
 * Receive BlueMote gamepad packets over Bluetooth UART.
 */
//% color="#684F8E" weight=80 icon="\uf11b"
namespace bluemote {
    const PACKET_LEN = 11

    let started = false
    let pending = pins.createBuffer(PACKET_LEN)
    let pendingLen = 0

    let leftX = 0
    let leftY = 0
    let rightX = 0
    let rightY = 0
    let leftTrigger = 0
    let rightTrigger = 0
    let leftSetting = 0
    let rightSetting = 0
    let buttonMask = 0

    function applyPacket(): void {
        leftX = pending.getNumber(NumberFormat.Int8LE, 0)
        leftY = pending.getNumber(NumberFormat.Int8LE, 1)
        rightX = pending.getNumber(NumberFormat.Int8LE, 2)
        rightY = pending.getNumber(NumberFormat.Int8LE, 3)
        leftTrigger = pending.getNumber(NumberFormat.UInt8LE, 4)
        rightTrigger = pending.getNumber(NumberFormat.UInt8LE, 5)
        leftSetting = pending.getNumber(NumberFormat.Int16LE, 6)
        rightSetting = pending.getNumber(NumberFormat.Int16LE, 8)
        buttonMask = pending.getNumber(NumberFormat.UInt8LE, 10)
    }

    function ingest(chunk: Buffer): void {
        for (let i = 0; i < chunk.length; i++) {
            pending.setUint8(pendingLen, chunk.getUint8(i))
            pendingLen++
            if (pendingLen == PACKET_LEN) {
                applyPacket()
                pendingLen = 0
            }
        }
    }

    function poll(): void {
        let chunk = bluetooth.uartReadBuffer()
        if (chunk.length > 0) {
            ingest(chunk)
        }
    }

    /**
     * Start the BlueMote Bluetooth UART service.
     * Place this in the on start block.
     */
    //% block="BlueMote service"
    //% blockId=bluemote_service
    //% weight=100
    export function startService(): void {
        if (started) return
        started = true
        bluetooth.startUartService()
        control.inBackground(function () {
            while (true) {
                poll()
                basic.pause(5)
            }
        })
    }

    /**
     * True when the given BlueMote button is currently pressed.
     */
    //% block="button %btn is pressed"
    //% blockId=bluemote_button_pressed
    //% weight=90
    export function buttonIsPressed(btn: BlueMoteButton): boolean {
        return (buttonMask & (1 << btn)) != 0
    }

    /**
     * Stick axis value from -100 to 100.
     * Y is screen-style: down is positive.
     */
    //% block="stick %axis value"
    //% blockId=bluemote_stick_value
    //% weight=80
    export function stickValue(axis: BlueMoteStick): number {
        switch (axis) {
            case BlueMoteStick.LeftX:
                return leftX
            case BlueMoteStick.LeftY:
                return leftY
            case BlueMoteStick.RightX:
                return rightX
            case BlueMoteStick.RightY:
                return rightY
            default:
                return 0
        }
    }
}
