function DumpingСompost () {
    motions.LineFollowToDistance(300, AfterMotion.NoStop, params.SetFourLineFollowParams(30, 0.5, 1.5))
    motions.LineFollowToIntersection(AfterMotion.DecelRolling, params.SetFourLineFollowParams(50, 0.5, 1.5))
    pause(100)
    chassis.spinTurn(135, 40)
    pause(100)
    chassis.syncRampMovement(-10, -40, 50, 10, 20)
    pause(100)
    for (let index = 0; index < 2; index++) {
        BackManipulatorDrop()
        pause(150)
        BackManipulatorStartPos()
        pause(150)
    }
    RaiseManipulator()
    pause(10)
    chassis.pivotTurn(45, 40, WheelPivot.RightWheel)
    pause(100)
    control.runInParallel(function () {
        OpenManipulator()
    })
}
// Задний манипулятор в позицию сброса
function BackManipulatorDrop () {
    motors.mediumD.run(-50)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.stop()
}
function CapturingVegetablesAtStart () {
    // Манипулятор призакрыть, чтобы клешни манипулятора не касались других фигур
    control.runInParallel(function () {
        pause(600)
        motors.mediumA.run(40, 180, MoveUnit.Degrees)
    })
    chassis.pivotTurn(17, 40, WheelPivot.LeftWheel)
    pause(100)
    chassis.RampLinearDistMove(10, 30, 230, 20, 60)
    // Поднять фигурку
    RaiseManipulator()
    pause(100)
    chassis.pivotTurn(-70, -40, WheelPivot.RightWheel)
    control.runInParallel(function () {
        OpenManipulator()
    })
    pause(100)
    chassis.LinearDistMove(45, -30, Braking.Hold)
    pause(100)
    control.runInParallel(function () {
        motors.mediumA.run(40, 50, MoveUnit.Degrees)
    })
    chassis.spinTurn(90, 30)
    pause(200)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, 30, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 200, params.SetSevenLineAlignmentParams(40, 0.2, 0.2, 0.3, 0.3))
    pause(50)
    // Поднять фигурку
    RaiseManipulator()
    pause(100)
    chassis.pivotTurn(-60, -30, WheelPivot.LeftWheel)
    control.runInParallel(function () {
        OpenManipulator()
    })
    pause(50)
    chassis.pivotTurn(-60, -30, WheelPivot.RightWheel)
    pause(100)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, 35, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 200)
    pause(50)
    // Поднять фигурку
    RaiseManipulator()
    pause(100)
    chassis.pivotTurn(-90, -30, WheelPivot.RightWheel)
    control.runInParallel(function () {
        OpenManipulator()
    })
    pause(50)
    chassis.pivotTurn(-90, -30, WheelPivot.LeftWheel)
    pause(100)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, 35, AfterMotion.BreakStop)
    pause(100)
    chassis.LinearDistMove(10, 30, Braking.Hold)
    pause(50)
    motors.mediumA.run(40, 300, MoveUnit.Degrees)
    pause(500)
    chassis.LinearDistMove(100, -30, Braking.Hold)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, -30, AfterMotion.BreakStop)
    pause(50)
    chassis.LinearDistMove(20, 30, Braking.Hold)
    pause(100)
    chassis.spinTurn(90, 30)
}
function TransportationToMarket () {
    motions.LineFollowToDistance(150, AfterMotion.Rolling, params.SetFourLineFollowParams(30, 0.5, 1.5))
    pause(100)
    chassis.spinTurn(-90, 30)
    pause(100)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, -30, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 200)
    // Конец программы
    pause(100)
    chassis.RampLinearDistMove(10, 50, 520, 50, 50)
    // Конец программы
    pause(100)
    chassis.spinTurn(-140, 30)
    // Конец программы
    pause(100)
    chassis.RampLinearDistMove(-10, -40, 80, 20, 20)
    pause(100)
    for (let index = 0; index < 3; index++) {
        BackManipulatorDrop()
        pause(150)
        BackManipulatorStartPos()
        pause(150)
    }
    pause(100)
    chassis.pivotTurn(-130, 30, WheelPivot.LeftWheel)
    pause(2000)
    chassis.RampLinearDistMove(10, 40, 1100, 20, 50)
}
// Раскрыть манипулятор
function OpenManipulator () {
    motors.mediumA.run(-100)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.stop()
}
// Поднять манипулятор
function RaiseManipulator () {
    motors.mediumA.run(40)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.stop()
}
// Задний манимулятор установить в стартовое положение
function BackManipulatorStartPos () {
    motors.mediumD.run(40)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.stop()
}
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorRawRefValue(LineSensor.Left, 2460, 1740)
sensors.SetLineSensorRawRefValue(LineSensor.Right, 2368, 1664)
chassis.setSeparatelyChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setWheelRadius(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(180, MeasurementUnit.Millimeters)
chassis.setSyncRegulatorGains(0.02, 0, 0.5)
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
// Время после старта, чтобы убрать руки
pause(200)
// Часть 1 - захватить все овощи после старта
CapturingVegetablesAtStart()
pause(500)
DumpingСompost()
pause(500)
TransportationToMarket()
// Конец программы
pause(5000)
brick.exitProgram()
