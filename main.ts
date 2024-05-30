// Выгрузить красные овощи на рынок
function UnloadToMarket () {
    motions.LineFollowToDistance(100, AfterMotion.BreakStop)
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(100)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.NoStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 750)
    pause(100)
    // Может проехать больше, чтобы далее попасть сразу на красную зону маркета и отъезжать наоборот назад на белую линию? Для того, чтобы не касаться забора
    chassis.RampLinearDistMove(15, 70, 440, 50, 70)
    pause(100)
    chassis.pivotTurn(90, 50, WheelPivot.RightWheel)
    pause(100)
    chassis.LinearDistMove(30, 20, Braking.Hold)
    pause(100)
    chassis.pivotTurn(90, 50, WheelPivot.LeftWheel)
    pause(100)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.NoStop)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 80, AfterMotion.BreakStop)
    sensors.SetLineSensorRawRefValue(LineSensor.Left, 2432, 1688)
    sensors.SetLineSensorRawRefValue(LineSensor.Right, 2380, 1664)
    params.SetLineAlignmentShortParams(40, 0.3, 0.3, 0.5, 0.5)
    levelings.LineAlignment(VerticalLineLocation.Front, 1250)
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Right, 50)
    })
    pause(100)
    // Толкнуть вперёд
    chassis.LinearDistMove(30, 20, Braking.Hold)
    pause(100)
    chassis.LinearDistMove(60, -20, Braking.Hold)
}
function GreenhouseOne () {
    let vegetableColors: number[] = []
    chassis.spinTurn(-90, 30)
    pause(100)
    chassis.RampLinearDistMove(15, 80, 270, 50, 70)
    pause(100)
    chassis.spinTurn(-90, 30)
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Left, 100)
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 100)
    })
    pause(100)
    chassis.RampLinearDistMove(15, 80, 300, 50, 70)
    pause(100)
    chassis.spinTurn(90, 30)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(10, 30, 110, 50)
    chassis.steeringCommand(0, 30)
    pause(500)
    chassis.stop(true)
    pause(100)
    chassis.steeringCommand(-200, 10)
    pause(500)
    chassis.stop(true)
    pause(100)
    chassis.LinearDistMove(30, -30, Braking.Hold)
    pause(100)
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Left, 100, 1000)
    })
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Right, 100, 1000)
    })
    pause(1000)
    grib.LowerGrip(Grip.Right, 100)
    pause(100)
    chassis.pivotTurn(2, 30, WheelPivot.LeftWheel)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 40, 80, 500)
    chassis.steeringCommand(0, 20)
    pause(500)
    chassis.stop(true)
    pause(100)
    checkVegetableColor = true
    control.runInParallel(function () {
        while (checkVegetableColor) {
            colorTmp = RgbToHsvlToColorConvert(true)
            if (colorTmp == 4 || colorTmp == 7 || colorTmp == 5) {
                vegetableColors.push(colorTmp)
            }
            pause(20)
        }
    })
    chassis.RampLinearDistMove(-10, -60, 200, 50, 70)
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.DecelRolling)
    checkVegetableColor = false
    vegetableColor = custom.MostFrequentNumber(vegetableColors)
    brick.clearScreen()
    brick.printValue("vegetebleColor", vegetableColor, 1)
    music.setVolume(100)
    if (vegetableColor == 4 || vegetableColor == 7) {
        music.playSoundEffect(sounds.colorsYellow)
    } else if (vegetableColor == 5) {
        music.playSoundEffect(sounds.colorsRed)
    }
    control.runInParallel(function () {
        pause(2000)
        music.setVolume(20)
    })
    pause(100)
    chassis.spinTurn(90, 50)
    pause(100)
    motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling)
    pause(100)
    if (vegetableColor == 4 || vegetableColor == 7) {
        chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
        control.runInParallel(function () {
            grib.LiftGrip(Grip.Right, 50)
        })
        pause(200)
        chassis.LinearDistMove(50, 40, Braking.Hold)
        pause(100)
        chassis.LinearDistMove(50, -40, Braking.Hold)
        pause(100)
        chassis.pivotTurn(41, -50, WheelPivot.LeftWheel)
        pause(100)
        chassis.RampLinearDistMove(-15, -50, 120, 30, 50)
    } else if (vegetableColor == 5) {
    	
    }
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
    color = sensors.HsvlToColorNum(hsvlCS, sensors.HsvlToColorNumParams(50, 10, 1, 20, 25, 100, 180, 260))
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
    chassis.pivotTurn(9, 60, WheelPivot.LeftWheel)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.NoStop)
    chassis.LinearDistMove(30, 60, Braking.Hold)
    pause(400)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.NoStop)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 80, AfterMotion.BreakStop)
    pause(100)
    params.SetLineAlignmentShortParams(40, 0.3, 0.3, 0.5, 0.5)
    levelings.LineAlignment(VerticalLineLocation.Front, 800)
    pause(100)
    chassis.pivotTurn(85, -50, WheelPivot.RightWheel)
    pause(50)
    chassis.pivotTurn(85, -50, WheelPivot.LeftWheel)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.NoStop)
    chassis.LinearDistMove(30, 40, Braking.Hold)
    pause(400)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.NoStop)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 80, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 800)
    pause(100)
    chassis.RampLinearDistMove(-15, -30, 180, 50, 50)
    pause(50)
    chassis.spinTurn(90, 40)
    pause(100)
    chassis.LinearDistMove(30, 30, Braking.NoStop)
}
// Часть сброса компоста
function DumpingCompost () {
    motions.RampLineFollowToDistance(1500, 150, 100, Braking.NoStop, params.RampLineFollowSixParams(30, 60, 30, 0.2, 0.3))
    motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.LineFollowFourParams(30, 0.3, 0))
    pause(100)
    chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Left, 50)
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
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(20, 0.3, 0))
    pause(100)
    chassis.spinTurn(180, 50)
}
let column = 0
let color = 0
let hsvlCS: number[] = []
let rgbCS: number[] = []
let vegetableColor = 0
let colorTmp = 0
let checkVegetableColor = false
music.setVolume(20)
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorRawRefValue(LineSensor.Left, 2436, 1800)
sensors.SetLineSensorRawRefValue(LineSensor.Right, 2376, 1700)
// Установить датчику определения фигур минимальные значения RGB
sensors.SetColorSensorMinRgbValues(sensors.color3, 10, 12, 10)
// Установить датчику определения фигур максимальные значения RGB
sensors.SetColorSensorMaxRgbValues(sensors.color3, 93, 104, 67)
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
motions.SetDistRollingAfterInsetsection(35)
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
        grib.LowerGrip(Grip.Left, 20, 100)
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 20, 100)
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
        motions.RampLineFollowToDistance(1500, 200, 100, Braking.NoStop, params.RampLineFollowSixParams(20, 60, 30, 0.3, 0))
        music.playToneInBackground(740, music.beat(BeatFraction.Half))
        motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.LineFollowFourParams(30, 0.3, 0))
    } else if (brick.buttonDown.wasPressed()) {
        sensors.SearchRgbMinMaxColorSensors(sensors.color3)
        while (true) {
            RgbToHsvlToColorConvert(true)
        }
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
    pause(100)
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
pause(10000)
brick.exitProgram()
