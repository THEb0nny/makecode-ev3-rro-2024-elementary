// Проверка и выталкивание чернозёма с одной стороны
function CheckingAndPushingOutBlackSoil () {
    for (let index = 0; index <= 2; index++) {
        chassis.spinTurn(90, 30)
        pause(50)
        motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
        pause(50)
        levelings.LineAlignment(VerticalLineLocation.Behind, 500, params.SevenLineAlignmentParams(40, 0.3, 0.3, 0.3, 0.3, 0, 0))
        pause(50)
        chassis.LinearDistMove(60, 30, Braking.NoStop)
        motions.MoveToRefZone(0, 30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
        levelings.LineAlignment(VerticalLineLocation.Front, 300)
        pause(50)
        chassis.LinearDistMove(40, 30, Braking.Hold)
        colors = []
        for (let index2 = 0; index2 < 10; index2++) {
            colors.push(RgbToHsvlToColorConvert(true))
            pause(15)
        }
        figureColor = custom.MostFrequentNumber(colors)
        brick.clearScreen()
        brick.printValue("color", figureColor, 1)
        // Если фигурка чёрная
        if (figureColor == 1 || figureColor == 0) {
            chassis.LinearDistMove(95, 30, Braking.Hold)
        }
        pause(100)
        motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.NoBreakStop)
        pause(100)
        motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.BreakStop)
        pause(50)
        chassis.LinearDistMove(30, 30, Braking.Hold)
        pause(50)
        chassis.spinTurn(-90, 30)
        pause(50)
        if (index < 2) {
            motions.LineFollowToDistance(180, AfterMotion.BreakStop)
        }
    }
}
function RightManipulator (_break: boolean) {
    motors.mediumD.run(-20)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.setBrake(_break)
    motors.mediumD.stop()
}
// Часть с выталкиванием чернозёма с двух сторон
function RemoveBlackSoil () {
    if (true) {
        chassis.pivotTurn(90, 30, WheelPivot.RightWheel)
        pause(50)
        chassis.pivotTurn(90, 30, WheelPivot.LeftWheel)
        motions.MoveToRefZone(0, 40, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
        levelings.LineAlignment(VerticalLineLocation.Front, 300)
        chassis.LinearDistMove(40, 30, Braking.Hold)
        pause(50)
        chassis.spinTurn(90, 30)
        pause(50)
    }
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.SetFourLineFollowParams(40, 0.4, 1.5))
    pause(100)
    chassis.spinTurn(180, 30)
    pause(50)
    // Доехать после перекрёстка до первой стороны
    motions.LineFollowToDistance(175, AfterMotion.BreakStop)
    pause(50)
    CheckingAndPushingOutBlackSoil()
    pause(100)
    // Проехать до следующей стороны
    motions.LineFollowToDistance(470, AfterMotion.BreakStop)
    pause(100)
    CheckingAndPushingOutBlackSoil()
}
// Едем домой
function GoHome () {
    motions.LineFollowToDistance(300, AfterMotion.Rolling)
    // Если нужно повернуть в зону финиша, то ИСТИНУ ставить
    if (false) {
        pause(50)
        chassis.pivotTurn(90, 50, WheelPivot.LeftWheel)
    }
    // Конец программы
    pause(1000)
    music.stopAllSounds()
    music.playSoundEffectUntilDone(sounds.informationStop)
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
function LeftManipulator (_break: boolean) {
    motors.mediumA.run(-20)
    motors.mediumA.pauseUntilStalled()
    motors.mediumA.setBrake(_break)
    motors.mediumA.stop()
}
// Часть перемещения ко второй зоне с овощами
function CapturingVegetablesAtZone2 () {
    chassis.pivotTurn(90, 30, WheelPivot.LeftWheel)
    pause(50)
    chassis.RampLinearDistMove(10, 60, 950, 20, 50)
    pause(50)
    chassis.spinTurn(-90, 30)
    pause(50)
    motions.MoveToRefZone(0, 20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 200)
    pause(50)
    chassis.pivotTurn(-45, -40, WheelPivot.RightWheel)
    pause(50)
    chassis.pivotTurn(-45, -40, WheelPivot.LeftWheel)
    motions.MoveToRefZone(0, 15, LineSensorSelection.OnlyLeft, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    for (let index = 0; index < 10; index++) {
        figureColor = RgbToHsvlToColorConvert(true)
        pause(10)
    }
    pause(100)
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
    pause(100)
    chassis.pivotTurn(-70, -40, WheelPivot.RightWheel)
    control.runInParallel(function () {
    	
    })
    pause(100)
    chassis.LinearDistMove(45, -30, Braking.Hold)
    pause(100)
    control.runInParallel(function () {
        motors.mediumA.run(40, 50, MoveUnit.Degrees)
    })
    chassis.spinTurn(90, 30)
    pause(100)
    motions.MoveToRefZone(0, 20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 200, params.SevenLineAlignmentParams(40, 0.3, 0.3, 0.3, 0.3, 0, 0))
    pause(50)
    pause(100)
    chassis.pivotTurn(-60, -30, WheelPivot.LeftWheel)
    control.runInParallel(function () {
    	
    })
    pause(50)
    chassis.pivotTurn(-60, -30, WheelPivot.RightWheel)
    pause(100)
    motions.MoveToRefZone(0, 35, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Front, 200)
    pause(50)
    pause(100)
    chassis.pivotTurn(-90, -30, WheelPivot.RightWheel)
    control.runInParallel(function () {
    	
    })
    pause(50)
    chassis.pivotTurn(-87, -30, WheelPivot.LeftWheel)
    pause(100)
    chassis.LinearDistMove(30, 35, Braking.NoStop)
    motions.MoveToRefZone(0, 35, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    pause(100)
    chassis.LinearDistMove(10, 20, Braking.Hold)
    pause(50)
    motors.mediumA.run(40, 300, MoveUnit.Degrees)
    pause(100)
    chassis.LinearDistMove(100, -30, Braking.Hold)
    motions.MoveToRefZone(0, -35, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    pause(50)
    chassis.LinearDistMove(20, 30, Braking.Hold)
    pause(100)
    chassis.spinTurn(90, 30)
}
// Часть сброса компоста
function DumpingCompost () {
    motions.LineFollowToDistance(250, AfterMotion.NoStop, params.SetFourLineFollowParams(30, 0.4, 1.5))
    motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.SetFourLineFollowParams(40, 0.4, 1.5))
    pause(50)
    chassis.spinTurn(135, 40)
    pause(50)
    chassis.syncRampMovement(-10, -40, 50, 10, 20)
    pause(50)
    for (let index = 0; index < 2; index++) {
        pause(200)
        pause(200)
    }
    pause(10)
    chassis.pivotTurn(45, 40, WheelPivot.RightWheel)
    pause(50)
    control.runInParallel(function () {
    	
    })
}
function GrabbingVegetablesAtStart () {
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
        LeftManipulator(true)
    })
    control.runInParallel(function () {
        RightManipulator(true)
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
    pause(50)
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
// Часть перемещения на рынок
function TransportationToMarket () {
    motions.LineFollowToDistance(150, AfterMotion.Rolling, params.SetFourLineFollowParams(30, 0.5, 1.5))
    chassis.spinTurn(-90, 30)
    pause(50)
    motions.MoveToRefZone(0, -30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 50, AfterMotion.BreakStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 600, params.SevenLineAlignmentParams(50, 0.4, 0.4, 0.3, 0.3, 0, 0))
    // Подворот, если выравнивание плохое
    if (true) {
        pause(10)
        // Корректируем то, что робот не верно выравнивается
        chassis.pivotTurn(5, 20, WheelPivot.LeftWheel)
        pause(10)
    }
    // Конец программы
    pause(50)
    chassis.RampLinearDistMove(10, 50, 500, 50, 50)
    // Конец программы
    pause(50)
    chassis.spinTurn(90, 30)
    // Конец программы
    pause(50)
    chassis.RampLinearDistMove(10, 40, 170, 20, 30)
    // Конец программы
    pause(50)
    chassis.spinTurn(-90, 30)
    // Конец программы
    pause(50)
    motions.MoveToRefZone(0, 20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 90, AfterMotion.BreakStop)
    // Конец программы
    pause(50)
    levelings.LineAlignment(VerticalLineLocation.Front, 300)
    // Конец программы
    pause(50)
    chassis.spinTurn(180, 30)
    pause(50)
    for (let index = 0; index < 5; index++) {
        pause(200)
        pause(200)
    }
}
let column = 0
let color = 0
let hsvlCS: number[] = []
let rgbCS: number[] = []
let figureColor = 0
let colors: number[] = []
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
        LeftManipulator(true)
    })
    control.runInParallel(function () {
        RightManipulator(true)
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
pause(200)
GrabbingVegetablesAtStart()
// Конец программы
pause(5000)
brick.exitProgram()
