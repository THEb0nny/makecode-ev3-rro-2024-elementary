// Выгрузить красные овощи на рынок
function UnloadToMarket () {
    motions.LineFollowToDistance(100, AfterMotion.BreakStop)
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(50)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 750)
    pause(100)
    chassis.RampLinearDistMove(15, 60, 370, 50, 70)
    pause(100)
    chassis.pivotTurn(89, 50, WheelPivot.RightWheel)
    pause(100)
    chassis.LinearDistMove(40, 20, Braking.Hold)
    pause(100)
    chassis.pivotTurn(90, 50, WheelPivot.LeftWheel)
    pause(50)
    motions.MoveToRefZone(0, 20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.BreakStop)
    sensors.SetLineSensorRawRefValue(LineSensor.Left, 2432, 1688)
    sensors.SetLineSensorRawRefValue(LineSensor.Right, 2380, 1664)
    params.SetLineAlignmentShortParams(40, 0.3, 0.3, 0.5, 0.5)
    levelings.LineAlignment(VerticalLineLocation.Front, 1250)
    control.runInParallel(function () {
        RightGripRaise(50, 0, true)
    })
    pause(100)
    chassis.LinearDistMove(30, 20, Braking.Hold)
    pause(100)
    chassis.LinearDistMove(60, -20, Braking.Hold)
}
// Правый захват отпустить до конца
function RightGripRelease (speed: number, stalledDetectionDelay: number, hold: boolean) {
    motors.mediumD.run(Math.abs(speed) * -1)
    pause(stalledDetectionDelay)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.setBrake(hold)
    motors.mediumD.stop()
}
// Левый захват отпустить до конца
function LeftGripRelease (speed: number, stalledDetectionDelay: number, hold: boolean) {
    motors.mediumA.run(Math.abs(speed) * -1)
    pause(stalledDetectionDelay)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.setBrake(hold)
    motors.mediumA.stop()
}
// Правый захват поднять до конца
function RightGripRaise (speed: number, stalledDetectionDelay: number, hold: boolean) {
    motors.mediumD.run(Math.abs(speed))
    pause(stalledDetectionDelay)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.setBrake(hold)
    motors.mediumD.stop()
}
function GreenhouseOne () {
    chassis.spinTurn(-90, 30)
    pause(100)
    chassis.RampLinearDistMove(15, 60, 220, 50, 70)
    pause(100)
    chassis.spinTurn(-90, 30)
    control.runInParallel(function () {
        LeftGripRelease(100, 0, true)
    })
    control.runInParallel(function () {
        RightGripRelease(100, 0, true)
    })
    pause(100)
    chassis.RampLinearDistMove(15, 60, 310, 50, 70)
    pause(100)
    chassis.spinTurn(90, 30)
    pause(100)
    chassis.LinearDistMove(140, 50, Braking.Hold)
    pause(100)
    control.runInParallel(function () {
        LeftGripRaise(100, 1000, true)
    })
    control.runInParallel(function () {
        RightGripRaise(100, 1000, true)
    })
    pause(1200)
    RightGripRelease(100, 0, true)
    pause(100)
    chassis.pivotTurn(5, 30, WheelPivot.LeftWheel)
    pause(100)
    chassis.LinearDistMove(80, 50, Braking.Hold)
    pause(100)
    chassis.LinearDistMove(100, -50, Braking.Hold)
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
// Захват овощей у зоны старта
function CapturingVegetablesAtStart () {
    chassis.pivotTurn(10, 60, WheelPivot.LeftWheel)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.NoStop)
    chassis.LinearDistMove(40, 60, Braking.Hold)
    pause(400)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    pause(100)
    params.SetLineAlignmentShortParams(40, 0.3, 0.3, 0.5, 0.5)
    levelings.LineAlignment(VerticalLineLocation.Front, 1000)
    pause(100)
    chassis.pivotTurn(80, -50, WheelPivot.RightWheel)
    pause(50)
    chassis.pivotTurn(80, -50, WheelPivot.LeftWheel)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.NoStop)
    chassis.LinearDistMove(40, 40, Braking.Hold)
    pause(400)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 80, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 1000)
    pause(50)
    chassis.RampLinearDistMove(-15, -30, 180, 50, 50)
    pause(50)
    chassis.spinTurn(90, 40)
    pause(100)
    chassis.LinearDistMove(30, 40, Braking.NoStop)
}
// Часть сброса компоста
function DumpingCompost () {
    motions.RampLineFollowToDistance(1500, 150, 100, Braking.NoStop, params.RampLineFollowSixParams(15, 60, 30, 0.3, 0.3))
    motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.LineFollowFourParams(30, 0.3, 0))
    pause(50)
    chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
    control.runInParallel(function () {
        LeftGripRaise(50, 0, true)
    })
    pause(200)
    chassis.LinearDistMove(50, 40, Braking.Hold)
    pause(100)
    chassis.LinearDistMove(50, -40, Braking.Hold)
    pause(100)
    chassis.pivotTurn(41, -50, WheelPivot.LeftWheel)
    pause(100)
    chassis.RampLinearDistMove(-15, -50, 120, 30, 50)
    pause(100)
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(20, 0.2, 0))
    pause(100)
    chassis.spinTurn(180, 50)
}
// Левый захват поднять до конца
function LeftGripRaise (speed: number, stalledDetectionDelay: number, hold: boolean) {
    motors.mediumA.run(Math.abs(speed))
    pause(stalledDetectionDelay)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.setBrake(hold)
    motors.mediumA.stop()
}
let column = 0
let color = 0
let hsvlCS: number[] = []
let rgbCS: number[] = []
music.setVolume(20)
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorRawRefValue(LineSensor.Left, 2436, 1800)
sensors.SetLineSensorRawRefValue(LineSensor.Right, 2376, 1700)
// Установить датчику определения фигур минимальные значения RGB
sensors.SetColorSensorMinRgbValues(sensors.color3, 0, 1, 2)
// Установить датчику определения фигур максимальные значения RGB
sensors.SetColorSensorMaxRgbValues(sensors.color3, 204, 190, 243)
// Заспамить командой, чтобы датчик цвета включился в режиме цвета
for (let index = 0; index < 10; index++) {
    custom.PreparingSensors()
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
// Привести захваты в стартовое положение
if (true) {
    control.runInParallel(function () {
        LeftGripRelease(20, 100, true)
    })
    control.runInParallel(function () {
        RightGripRelease(20, 100, true)
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
    } else if (brick.buttonUp.wasPressed()) {
        motions.RampLineFollowToDistance(1500, 200, 100, Braking.NoStop, params.RampLineFollowSixParams(15, 60, 30, 0.3, 0.5))
        music.playToneInBackground(740, music.beat(BeatFraction.Half))
        motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.LineFollowFourParams(30, 0.3, 0))
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
if (true) {
    // Время после старта, чтобы убрать руки
    pause(100)
    UnloadToMarket()
}
if (true) {
    // Время после старта, чтобы убрать руки
    pause(100)
    GreenhouseOne()
}
// Конец программы
pause(2000)
brick.exitProgram()
