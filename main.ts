// Задний манипулятор в позицию сброса
function BackManipulatorDrop () {
    motors.mediumD.run(-50)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.stop()
}
// Раскрыть манипулятор
function OpenManipulator () {
    motors.mediumA.run(-20)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.stop()
}
// Поднять манипулятор
function RaiseManipulator () {
    motors.mediumA.run(40)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.stop()
}
function BackManipulatorStartPos () {
    motors.mediumD.run(50)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.stop()
}
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorRawRefValue(LineSensor.Left, 2412, 1772)
sensors.SetLineSensorRawRefValue(LineSensor.Right, 2340, 1680)
chassis.setSeparatelyChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setWheelRadius(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(180, MeasurementUnit.Millimeters)
chassis.setRegulatorGains(0.02, 0, 0.5)
motions.SetDistRollingAfterInsetsection(50)
motions.SetDistRollingAfterIntersectionMoveOut(20)
motions.SetLineFollowLoopDt(5)
motors.mediumA.setBrake(true)
motors.mediumA.setInverted(true)
motors.mediumD.setBrake(true)
control.runInParallel(function () {
    // Раскрыть манипулятор перед стартом
    OpenManipulator()
    BackManipulatorStartPos()
})
brick.printString("PRESS TO RUN", 7, 10)
brick.setStatusLight(StatusLight.GreenPulse)
brick.buttonEnter.pauseUntil(ButtonEvent.Bumped)
brick.showPorts()
brick.setStatusLight(StatusLight.Off)
// Старт
pause(200)
