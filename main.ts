function RemoveBlackSoil () {
    if (true) {
        chassis.pivotTurn(90, 30, WheelPivot.RightWheel)
        pause(50)
        chassis.pivotTurn(90, 30, WheelPivot.LeftWheel)
        motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, 40, AfterMotion.BreakStop)
        levelings.LineAlignment(VerticalLineLocation.Front, 300)
        chassis.LinearDistMove(40, 30, Braking.Hold)
        pause(50)
        chassis.spinTurn(90, 30)
        pause(50)
    }
    motions.LineFollowToIntersection(AfterMotion.BreakStop)
    pause(100)
    chassis.spinTurn(180, 30)
    pause(50)
    motions.LineFollowToDistance(155, AfterMotion.BreakStop)
    pause(50)
    chassis.spinTurn(90, 30)
    pause(50)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, -30, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 300)
    pause(50)
    chassis.LinearDistMove(70, 30, Braking.NoStop)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, 30, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 300)
    pause(50)
    chassis.LinearDistMove(50, 30, Braking.Hold)
    for (let index = 0; index < 10; index++) {
        figureСolor = RgbToHsvlToColorConvert(true)
        pause(10)
    }
    brick.clearScreen()
    brick.printValue("color", figureСolor, 1)
    if (figureСolor == 1) {
        chassis.LinearDistMove(50, 30, Braking.Hold)
        pause(10)
    }
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, -30, AfterMotion.NoStop)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Less, 20, 0, -20, AfterMotion.BreakStop)
    pause(50)
    chassis.LinearDistMove(30, 30, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 30)
    pause(50)
    motions.LineFollowToDistance(170, AfterMotion.BreakStop)
    // Конец программы
    pause(5000)
    brick.exitProgram()
}
// Задний манипулятор в позицию сброса
function BackManipulatorDrop () {
    motors.mediumD.run(-30)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.stop()
}
function RgbToHsvlToColorConvert (debug: boolean) {
    rgbCS = sensors.color3.rgbRaw()
    for (let i = 0; i <= 2; i++) {
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        // Нормализуем значения с датчика
        rgbCS[i] = Math.map(rgbCS[i], sensors.minRgbColorSensor3[i], sensors.maxRgbColorSensor3[i], 0, 255)
        rgbCS[i] = Math.constrain(rgbCS[i], 0, 255)
    }
    // Получаем HSVL
    hsvlCS = sensors.RgbToHsvlConverter(rgbCS)
    // Переводим HSVL в цветовой код
    color = sensors.HsvlToColorNum(hsvlCS, { colorBoundary: 65, whiteBoundary: 10, blackBoundary: 1, redBoundary: 25, brownBoundary: 30, yellowBoundary: 100, greenBoundary: 180, blueBoundary: 260
    })
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
function CapturingVegetablesAtZone2 () {
    chassis.pivotTurn(90, 30, WheelPivot.LeftWheel)
    pause(50)
    chassis.RampLinearDistMove(10, 60, 950, 20, 50)
    pause(50)
    chassis.spinTurn(-90, 30)
    pause(50)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, 20, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 200)
    pause(50)
    chassis.pivotTurn(-45, -40, WheelPivot.RightWheel)
    pause(50)
    chassis.pivotTurn(-45, -40, WheelPivot.LeftWheel)
    motions.MoveToRefZone(SensorSelection.OnlyLeft, LogicalOperators.Greater, 90, 0, 15, AfterMotion.BreakStop)
    for (let index = 0; index < 10; index++) {
        figureСolor = RgbToHsvlToColorConvert(true)
        pause(10)
    }
    RaiseManipulator()
    pause(100)
    OpenManipulator()
}
// Функция захвата овощей при старте
function CapturingVegetablesAtStart () {
    // Манипулятор призакрыть, чтобы клешни манипулятора не касались других фигур
    control.runInParallel(function () {
        pause(500)
        motors.mediumA.run(40, 180, MoveUnit.Degrees)
    })
    chassis.pivotTurn(17, 30, WheelPivot.LeftWheel)
    pause(100)
    chassis.RampLinearDistMove(10, 30, 235, 20, 60)
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
    pause(100)
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
    chassis.pivotTurn(-87, -30, WheelPivot.LeftWheel)
    pause(100)
    chassis.LinearDistMove(30, 35, Braking.NoStop)
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
function DumpingCompost () {
    motions.LineFollowToDistance(250, AfterMotion.NoStop, params.SetFourLineFollowParams(30, 0.4, 1.5))
    motions.LineFollowToIntersection(AfterMotion.DecelRolling, params.SetFourLineFollowParams(40, 0.4, 1.5))
    pause(50)
    chassis.spinTurn(135, 40)
    pause(50)
    chassis.syncRampMovement(-10, -40, 50, 10, 20)
    pause(50)
    for (let index = 0; index < 2; index++) {
        BackManipulatorDrop()
        pause(200)
        BackManipulatorStartPos()
        pause(200)
    }
    RaiseManipulator()
    pause(10)
    chassis.pivotTurn(45, 40, WheelPivot.RightWheel)
    pause(50)
    control.runInParallel(function () {
        OpenManipulator()
    })
}
function TransportationToMarket () {
    motions.LineFollowToDistance(130, AfterMotion.Rolling, params.SetFourLineFollowParams(30, 0.5, 1.5))
    chassis.spinTurn(-90, 30)
    pause(50)
    motions.MoveToRefZone(SensorSelection.LeftOrRight, LogicalOperators.Greater, 90, 0, -30, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 600)
    if (true) {
        pause(10)
        // Корректируем то, что робот не верно выравнивается
        chassis.pivotTurn(3, 20, WheelPivot.LeftWheel)
        pause(10)
    }
    // Конец программы
    pause(50)
    chassis.RampLinearDistMove(10, 50, 380, 50, 50)
    // Конец программы
    pause(50)
    chassis.pivotTurn(83, 30, WheelPivot.RightWheel)
    // Конец программы
    pause(50)
    chassis.pivotTurn(83, 30, WheelPivot.LeftWheel)
    // Конец программы
    pause(50)
    levelings.LineAlignment(VerticalLineLocation.Front, 300)
    // Конец программы
    pause(50)
    chassis.spinTurn(180, 30)
    pause(50)
    for (let index = 0; index < 4; index++) {
        BackManipulatorDrop()
        pause(200)
        BackManipulatorStartPos()
        pause(200)
    }
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
let column = 0
let color = 0
let hsvlCS: number[] = []
let rgbCS: number[] = []
let figureСolor = 0
let tmp: number[] = []
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorRawRefValue(LineSensor.Left, 2552, 1744)
sensors.SetLineSensorRawRefValue(LineSensor.Right, 2448, 1660)
// Установить датчику определения фигур минимальные значения RGB
sensors.SetColorSensorMinRgbValues(sensors.color3, [0, 1, 2])
// Установить датчику определения фигур максимальные значения RGB
sensors.SetColorSensorMaxRgbValues(sensors.color3, [204, 190, 243])
// Заспамить командой, чтобы датчик цвета включился в режиме цвета
for (let index = 0; index < 10; index++) {
    tmp = sensors.color3.rgbRaw()
    pause(10)
}
chassis.setSeparatelyChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setWheelRadius(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(180, MeasurementUnit.Millimeters)
chassis.setSyncRegulatorGains(0.02, 0, 0.5)
motions.SetDistRollingAfterInsetsection(50)
motions.SetDistRollingAfterIntersectionMoveOut(20)
motions.SetLineFollowLoopDt(5)
motors.mediumA.setInverted(true)
motors.mediumA.setBrake(true)
motors.mediumD.setBrake(true)
control.runInParallel(function () {
    // Раскрыть манипулятор перед стартом
    OpenManipulator()
    // Задний манипулятор на стартовую позицию
    BackManipulatorStartPos()
})
brick.printString("PRESS TO RUN", 7, 10)
brick.setStatusLight(StatusLight.GreenPulse)
// По кнопке вправо старт программы
brick.buttonRight.pauseUntil(ButtonEvent.Bumped)
brick.showPorts()
brick.setStatusLight(StatusLight.Off)
// Время после старта, чтобы убрать руки
pause(200)
// Часть 1 - захватить все овощи после старта
CapturingVegetablesAtStart()
pause(100)
// Часть 2 - сброс жёлтых овощей в компост
DumpingCompost()
pause(100)
// Часть 3 - сброс красных овощей в компост
TransportationToMarket()
pause(100)
// Часть 4 - вытолкнуть чернозём
RemoveBlackSoil()
