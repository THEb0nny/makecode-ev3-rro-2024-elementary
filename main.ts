function LeftManipulatorClose (_break: boolean) {
    motors.mediumA.run(-20)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.setBrake(_break)
    motors.mediumA.stop()
}
function RightManipulatorClose (_break: boolean) {
    motors.mediumD.run(-20)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.setBrake(_break)
    motors.mediumD.stop()
}
function RgbToHsvlToColorConvert (debug: boolean) {
    rgbCS = sensors.color3.rgbRaw()
    // Нормализуем значения с датчика
    for (let i = 0; i <= 2; i++) {
        rgbCS[i] = Math.map(rgbCS[i], sensors.GetMinRgbColorSensor(sensors.color3)[i], sensors.GetMaxRgbColorSensor(sensors.color3)[i], 0, 255)
        rgbCS[i] = Math.constrain(rgbCS[i], 0, 255)
    }
    // Получаем HSVL
    hsvlCS = sensors.RgbToHsvlConverter(rgbCS)
    // Переводим HSVL в цветовой код
    color = sensors.HsvlToColorNum(hsvlCS, sensors.HsvlToColorNumParams(50, 10, 1, 25, 30, 100, 180, 260))
    if (debug) {
        column = 20
        brick.clearScreen()
        brick.printValue("r", rgbCS[0], 1, column)
        brick.printValue("g", rgbCS[1], 2, column)
        brick.printValue("b", rgbCS[2], 3, column)
        brick.printValue("hue", hsvlCS[0], 5, column)
        brick.printValue("sat", hsvlCS[1], 6, column)
        brick.printValue("val", hsvlCS[2], 7, column)
        brick.printValue("light", hsvlCS[3], 8, column)
        brick.printValue("color", color, 10, column)
    }
    return color
}
function CapturingVegetablesAtStart () {
    chassis.pivotTurn(50, 60, WheelPivot.LeftWheel)
    pause(200)
    chassis.pivotTurn(46, 60, WheelPivot.RightWheel)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.NoStop)
    chassis.LinearDistMove(40, 60, Braking.Hold)
    pause(400)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    pause(100)
    params.SetLineAlignmentParams(40, 0.3, 0.3, 0, 0, 0.5, 0.5)
    levelings.LineAlignment(VerticalLineLocation.Front, 1000)
    pause(100)
    chassis.pivotTurn(80, -50, WheelPivot.RightWheel)
    pause(50)
    chassis.pivotTurn(80, -50, WheelPivot.LeftWheel)
    control.runInParallel(function () {
        LeftManipulatorClose(true)
    })
    control.runInParallel(function () {
        RightManipulatorClose(true)
    })
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.NoStop)
    chassis.LinearDistMove(40, 60, Braking.Hold)
    pause(400)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 1000)
    pause(50)
    chassis.LinearDistMove(170, -50, Braking.Hold)
    pause(50)
    chassis.spinTurn(90, 50)
}
// Часть сброса компоста
function DumpingCompost () {
    chassis.LinearDistMove(30, 40, Braking.NoStop)
    motions.LineFollowToDistance(300, AfterMotion.NoStop, params.SetFourLineFollowParams(30, 0.3, 0))
    motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.SetFourLineFollowParams(60, 0.2, 1))
    pause(50)
    chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
    motors.mediumA.run(50)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.stop()
    pause(50)
    chassis.pivotTurn(43, -50, WheelPivot.LeftWheel)
    pause(50)
    chassis.LinearDistMove(100, -50, Braking.Hold)
    pause(50)
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.SetFourLineFollowParams(20, 0.2, 0))
    pause(50)
    chassis.spinTurn(180, 50)
    pause(50)
    motions.LineFollowToDistance(100, AfterMotion.BreakStop)
    pause(50)
    chassis.spinTurn(-90, 50)
    pause(50)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 750)
    pause(50)
    chassis.LinearDistMove(370, 60, Braking.Hold)
    pause(50)
    chassis.pivotTurn(90, 50, WheelPivot.RightWheel)
    pause(50)
    chassis.LinearDistMove(120, 60, Braking.Hold)
    pause(50)
    chassis.pivotTurn(90, 50, WheelPivot.LeftWheel)
    pause(50)
    motions.MoveToRefZone(0, 20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.BreakStop)
    pause(50)
    control.runInParallel(function () {
        motors.mediumD.run(50)
        motors.mediumD.pauseUntilStalled()
        motors.mediumD.stop()
    })
    levelings.LineAlignment(VerticalLineLocation.Behind, 500)
}
let column = 0
let color = 0
let hsvlCS: number[] = []
let rgbCS: number[] = []
music.setVolume(20)
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorRawRefValue(LineSensor.Left, 2692, 1664)
sensors.SetLineSensorRawRefValue(LineSensor.Right, 2532, 1552)
// Установить датчику определения фигур минимальные значения RGB
sensors.SetColorSensorMinRgbValues(sensors.color3, 0, 1, 2)
// Установить датчику определения фигур максимальные значения RGB
sensors.SetColorSensorMaxRgbValues(sensors.color3, 204, 190, 243)
// Заспамить командой, чтобы датчик цвета включился в режиме цвета
for (let index = 0; index < 10; index++) {
    sensors.color3.rgbRaw()
sensors.nxtLight1.light(NXTLightIntensityMode.ReflectedRaw);
sensors.nxtLight4.light(NXTLightIntensityMode.ReflectedRaw);
pause(10)
}
chassis.setSeparatelyChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setWheelRadius(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(185, MeasurementUnit.Millimeters)
chassis.setSyncRegulatorGains(0.02, 0, 0.5)
motions.SetLineFollowRefTreshold(40)
motions.SetDistRollingAfterInsetsection(50)
motions.SetDistRollingAfterIntersectionMoveOut(20)
levelings.SetDistanceBetweenLineSensors(32)
motions.SetLineFollowLoopDt(2)
levelings.SetLineAlignmentOrPositioningLoopDt(2)
motors.mediumA.setInverted(false)
motors.mediumD.setInverted(false)
motors.mediumA.setBrake(true)
motors.mediumD.setBrake(true)
if (true) {
    control.runInParallel(function () {
        LeftManipulatorClose(true)
    })
    control.runInParallel(function () {
        RightManipulatorClose(true)
    })
}
brick.printString("PRESS TO RUN", 7, 10)
brick.setStatusLight(StatusLight.GreenPulse)
while (true) {
    if (brick.buttonLeft.wasPressed()) {
        custom.FunctionsTune()
        break;
    } else if (brick.buttonRight.wasPressed()) {
        break;
    }
}
brick.showPorts()
brick.setStatusLight(StatusLight.Off)
// Время после старта, чтобы убрать руки
pause(100)
if (true) {
    CapturingVegetablesAtStart()
}
if (true) {
    // Время после старта, чтобы убрать руки
    pause(50)
    DumpingCompost()
}
// Конец программы
pause(5000)
brick.exitProgram()
