// Функция завершения определения цвета фигуры
function FinishCheckVegetableColor () {
    checkVegetableColor = false
    vegetableColor = custom.MostFrequentNumber(vegetableColors)
    if (vegetableColor == 4 || vegetableColor == 7) {
        vegetableColor = 4
    }
    brick.clearScreen()
    brick.printValue("vegetebleColor", vegetableColor, 1)
    music.setVolume(100)
    if (vegetableColor == 4) {
        music.playSoundEffect(sounds.colorsYellow)
    } else if (vegetableColor == 5) {
        music.playSoundEffect(sounds.colorsRed)
    } else {
        music.playSoundEffectUntilDone(sounds.informationErrorAlarm)
        control.panic(99)
    }
    control.runInParallel(function () {
        pause(2000)
        music.setVolume(20)
    })
}
// Функция старта определения цвета фигуры
function StartCheckVegetableColor () {
    checkVegetableColor = true
    vegetableColors = []
    colorTmp = 0
    control.runInParallel(function () {
        while (checkVegetableColor) {
            colorTmp = custom.GetColor(true)
            if (colorTmp == 4 || colorTmp == 7 || colorTmp == 5) {
                vegetableColors.push(colorTmp)
            }
            pause(20)
        }
    })
}
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
    chassis.RampLinearDistMove(15, 80, 440, 50, 70)
    pause(100)
    chassis.pivotTurn(90, 50, WheelPivot.RightWheel)
    pause(100)
    chassis.LinearDistMove(30, 20, Braking.Hold)
    pause(200)
    chassis.pivotTurn(90, 50, WheelPivot.LeftWheel)
    pause(100)
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Right, 50)
    })
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.NoStop)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 80, AfterMotion.BreakStop)
    sensors.SetLineSensorRawRefValue(LineSensor.Left, 2432, 1688)
    sensors.SetLineSensorRawRefValue(LineSensor.Right, 2380, 1664)
    levelings.LineAlignment(VerticalLineLocation.Front, 1000)
    pause(100)
    // Толкнуть вперёд
    chassis.LinearDistMove(30, 20, Braking.Hold)
    pause(100)
    chassis.LinearDistMove(60, -20, Braking.Hold)
}
// Работа с теплицой 1
function GreenhouseOne () {
    chassis.spinTurn(-90, 50)
    pause(100)
    chassis.RampLinearDistMove(15, 80, 270, 50, 80)
    pause(200)
    chassis.spinTurn(-90, 50)
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Left, 100)
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 100)
    })
    pause(100)
    chassis.RampLinearDistMove(15, 80, 310, 50, 80)
    pause(100)
    chassis.spinTurn(90, 50)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 40, 110, 50)
    chassis.steeringCommand(0, 20)
    pause(500)
    chassis.stop(true)
    pause(100)
    chassis.LinearDistMove(5, -20, Braking.Hold)
    pause(100)
    chassis.steeringCommand(-200, 5)
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
    chassis.pivotTurn(2, 50, WheelPivot.LeftWheel)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 40, 80, 50)
    chassis.steeringCommand(0, 20)
    pause(500)
    chassis.stop(true)
    StartCheckVegetableColor()
    chassis.RampLinearDistMove(-15, -70, 230, 50, 70)
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(100)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 20, AfterMotion.DecelRolling)
    FinishCheckVegetableColor()
    GreenhouseOneVegetebleColor = vegetableColor
    pause(100)
    chassis.spinTurn(90, 50)
    pause(100)
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(20, 0.3, 0))
    pause(100)
    if (vegetableColor == 4) {
        chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
        control.runInParallel(function () {
            grib.LiftGrip(Grip.Right, 100, 100)
        })
        pause(200)
        chassis.LinearDistMove(50, 40, Braking.Hold)
        pause(200)
        chassis.LinearDistMove(50, -40, Braking.Hold)
        pause(100)
        chassis.pivotTurn(41, -50, WheelPivot.LeftWheel)
        pause(100)
        chassis.RampLinearDistMove(-15, -70, 120, 30, 50)
    } else if (vegetableColor == 5) {
        chassis.spinTurn(180, 50)
        pause(100)
        UnloadToMarket()
        pause(100)
        chassis.spinTurn(-90, 50)
        pause(100)
        chassis.RampLinearDistMove(15, 80, 200, 50, 70)
        pause(100)
        chassis.spinTurn(-90, 50)
        pause(100)
        chassis.RampLinearDistMoveWithoutBraking(15, 50, 300, 50)
        motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.DecelRolling)
        pause(100)
        chassis.spinTurn(90, 50)
    }
    pause(100)
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(30, 0.3, 0))
    pause(100)
    chassis.spinTurn(180, 50)
}
// Работа с теплицой 2
function GreenhouseTwo () {
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Left, 50, 100)
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 50, 100)
    })
    motions.RampLineFollowToDistance(520, 50, 100, Braking.Hold, params.RampLineFollowThreeParams(15, 50, 15))
    pause(200)
    chassis.spinTurn(-90, 100)
    pause(100)
    motions.MoveToRefZone(0, -30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.NoStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 750)
    pause(100)
    chassis.LinearDistMove(10, 40, Braking.NoStop)
    chassis.steeringCommand(0, 20)
    pause(500)
    chassis.stop(true)
    pause(100)
    chassis.LinearDistMove(5, -20, Braking.Hold)
    pause(100)
    chassis.steeringCommand(-200, 5)
    pause(500)
    chassis.stop(true)
    pause(100)
    chassis.LinearDistMove(30, -30, Braking.Hold)
    pause(100)
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Left, 100, 1000, false)
    })
    control.runInParallel(function () {
        grib.LiftGrip(Grip.Right, 100, 1000, false)
    })
    pause(1200)
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 100, 200)
    })
    pause(500)
    chassis.pivotTurn(2, 50, WheelPivot.LeftWheel)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 40, 30, 30)
    chassis.steeringCommand(0, 30)
    pause(500)
    chassis.stop(true)
    pause(200)
    StartCheckVegetableColor()
    chassis.LinearDistMove(20, -30, Braking.NoStop)
    motions.MoveToRefZone(0, -30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
    pause(500)
    FinishCheckVegetableColor()
    GreenhouseTwoVegetebleColor = vegetableColor
    pause(50)
    if (vegetableColor == 4) {
        chassis.spinTurn(-90, 50)
        pause(100)
        motions.RampLineFollowToDistance(400, 100, 100, Braking.NoStop, params.RampLineFollowSixParams(15, 50, 30, 0.2, 0.3))
        motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.LineFollowFourParams(30, 0.3, 0))
        pause(100)
        chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
        control.runInParallel(function () {
            grib.LiftGrip(Grip.Right, 100, 100, false)
        })
        pause(100)
        chassis.LinearDistMove(50, 50, Braking.Hold)
        pause(200)
        chassis.LinearDistMove(50, -50, Braking.Hold)
        pause(100)
        chassis.pivotTurn(40, -50, WheelPivot.LeftWheel)
        pause(100)
        chassis.RampLinearDistMove(-15, -70, 120, 30, 50)
        pause(100)
        motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(30, 0.3, 0))
        pause(100)
        chassis.spinTurn(180, 50)
        pause(100)
        // Овощи из второй зоны при позиции робота с компоста
        VegetablesInZoneTwoAtCompostPosition()
    } else if (vegetableColor == 5) {
        chassis.spinTurn(90, 50)
        pause(100)
        motions.RampLineFollowToDistance(1030, 150, 100, Braking.Hold, params.RampLineFollowSixParams(15, 60, 15, 0.2, 0.3))
        pause(100)
        chassis.spinTurn(-90, 50)
        pause(100)
        motions.MoveToRefZone(0, -30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.NoStop)
        levelings.LineAlignment(VerticalLineLocation.Behind, 750)
        pause(100)
        chassis.RampLinearDistMove(15, 80, 400, 50, 100)
        pause(100)
        chassis.spinTurn(-90, 50)
        pause(100)
        chassis.RampLinearDistMove(15, 80, 440, 50, 100)
        pause(100)
        chassis.spinTurn(90, 50)
        pause(100)
        motions.MoveToRefZone(0, 50, LineSensorSelection.LeftAndRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
        pause(100)
        chassis.pivotTurn(50, 50, WheelPivot.LeftWheel)
        control.runInParallel(function () {
            grib.LiftGrip(Grip.Right, 100, 100, false)
        })
        pause(100)
        chassis.pivotTurn(40, -50, WheelPivot.LeftWheel)
        pause(100)
        motions.MoveToRefZone(0, -30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
        pause(50)
        sensors.SetLineSensorsRawRefValues(2500, 2420, 1748, 1640)
        levelings.LineAlignment(VerticalLineLocation.Front, 1000)
        pause(100)
        // Овощи второй зоны из позиции робота на рынке
        VegetablesInZoneTwoAtMarketPosition()
    }
    pause(100)
    VegetablesPosition2()
}
function VegetablesPosition2 () {
    levelings.LineAlignment(VerticalLineLocation.Front, 1000)
    pause(100)
    if (GreenhouseOneVegetebleColor == 4 && GreenhouseTwoVegetebleColor == 4) {
        rightGripVegetableColor = 5
        leftGripVegetableColor = 5
    } else if (GreenhouseOneVegetebleColor == 5 && GreenhouseTwoVegetebleColor == 5) {
        rightGripVegetableColor = 4
        leftGripVegetableColor = 4
    } else {
        StartCheckVegetableColor()
    }
    chassis.RampLinearDistMove(-15, -60, 100, 50, 50)
    if (GreenhouseOneVegetebleColor != GreenhouseTwoVegetebleColor) {
        pause(100)
        chassis.spinTurn(10, 20)
        pause(200)
        chassis.spinTurn(-10, 20)
        pause(200)
        FinishCheckVegetableColor()
        rightGripVegetableColor = vegetableColor
        leftGripVegetableColor = 18 - (GreenhouseOneVegetebleColor + GreenhouseTwoVegetebleColor + rightGripVegetableColor)
    }
    control.runInParallel(function () {
        music.setVolume(100)
        if (rightGripVegetableColor == 4) {
            music.playSoundEffectUntilDone(sounds.colorsYellow)
        } else if (rightGripVegetableColor == 5) {
            music.playSoundEffectUntilDone(sounds.colorsRed)
        }
        pause(200)
        if (leftGripVegetableColor == 4) {
            music.playSoundEffectUntilDone(sounds.colorsYellow)
        } else if (leftGripVegetableColor == 5) {
            music.playSoundEffectUntilDone(sounds.colorsRed)
        }
        pause(500)
        music.setVolume(20)
    })
    pause(500)
    colorTmp = leftGripVegetableColor + rightGripVegetableColor
    if (colorTmp == 10 || colorTmp == 9) {
        chassis.spinTurn(-90, 50)
        pause(100)
        chassis.RampLinearDistMove(15, 70, 280, 50, 100)
        pause(100)
        chassis.spinTurn(90, 50)
        pause(100)
        motions.MoveToRefZone(0, 30, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
        pause(100)
        if (colorTmp == 10) {
            control.runInParallel(function () {
                grib.LiftGrip(Grip.Left, 100, 200)
                leftGripVegetableColor = 0
            })
            control.runInParallel(function () {
                grib.LiftGrip(Grip.Right, 100, 200)
                rightGripVegetableColor = 0
            })
        } else if (leftGripVegetableColor == 5) {
            control.runInParallel(function () {
                grib.LiftGrip(Grip.Left, 100, 200)
                leftGripVegetableColor = 0
            })
        } else if (rightGripVegetableColor == 5) {
            control.runInParallel(function () {
                grib.LiftGrip(Grip.Right, 100, 200)
                rightGripVegetableColor = 0
            })
        }
        chassis.pivotTurn(25, 50, WheelPivot.LeftWheel)
        pause(200)
        chassis.pivotTurn(25, -50, WheelPivot.LeftWheel)
        pause(100)
        levelings.LineAlignment(VerticalLineLocation.Front, 1000)
        pause(100)
        chassis.RampLinearDistMove(-15, -60, 80, 40, 50)
        pause(100)
        chassis.spinTurn(-90, 50)
        pause(100)
        chassis.RampLinearDistMove(15, 80, 950, 50, 100)
    } else {
        chassis.RampLinearDistMove(15, 60, 100, 50, 50)
        pause(100)
        chassis.spinTurn(-90, 50)
        pause(2000)
        chassis.RampLinearDistMove(15, 80, 1300, 50, 100)
    }
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 50, 300, 50)
    motions.MoveToRefZone(0, 50, LineSensorSelection.LeftOrRight, LogicalOperators.Less, 30, AfterMotion.DecelRolling)
    pause(100)
    chassis.spinTurn(90, 50)
    pause(100)
    motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(30, 0.3, 0))
    if (leftGripVegetableColor == 4 || rightGripVegetableColor == 4) {
        chassis.pivotTurn(45, 50, WheelPivot.LeftWheel)
        if (leftGripVegetableColor == 4) {
            control.runInParallel(function () {
                grib.LiftGrip(Grip.Left, 100, 100)
            })
        }
        if (rightGripVegetableColor == 4) {
            control.runInParallel(function () {
                grib.LiftGrip(Grip.Right, 100, 100)
            })
        }
        pause(100)
        chassis.LinearDistMove(50, 40, Braking.Hold)
        pause(200)
        chassis.LinearDistMove(50, -40, Braking.Hold)
        pause(100)
        chassis.pivotTurn(41, -50, WheelPivot.LeftWheel)
        pause(100)
        chassis.RampLinearDistMove(-15, -70, 120, 30, 50)
        pause(100)
        motions.LineFollowToCrossIntersection(AfterMotion.BreakStop, params.LineFollowFourParams(30, 0.3, 0))
    }
    pause(100)
    chassis.spinTurn(180, 50)
}
// Захват овощей у зоны старта
function CapturingVegetablesAtStart () {
    chassis.pivotTurn(10, 60, WheelPivot.LeftWheel)
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
    pause(50)
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
    pause(200)
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
function VegetablesInZoneTwoAtCompostPosition () {
    motions.RampLineFollowToDistance(1550, 150, 150, Braking.Hold, params.RampLineFollowSixParams(15, 60, 15, 0.2, 0.3))
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(100)
    motions.MoveToRefZone(0, -20, LineSensorSelection.LeftOrRight, LogicalOperators.Greater, 70, AfterMotion.NoStop)
    levelings.LineAlignment(VerticalLineLocation.Behind, 1000)
    pause(100)
    chassis.RampLinearDistMove(15, 80, 400, 50, 100)
    pause(100)
    chassis.spinTurn(-90, 30)
    pause(100)
    chassis.RampLinearDistMove(15, 8, 170, 50, 70)
    pause(100)
    chassis.spinTurn(90, 30)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 30, 50, 50)
    pause(100)
    motions.MoveToRefZone(0, 30, LineSensorSelection.LeftAndRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
    pause(100)
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Left, 100)
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 100)
    })
}
function VegetablesInZoneTwoAtMarketPosition () {
    chassis.RampLinearDistMove(-15, -70, 150, 50, 50)
    pause(100)
    chassis.spinTurn(90, 50)
    pause(100)
    chassis.RampLinearDistMove(15, 80, 300, 50, 100)
    pause(100)
    chassis.spinTurn(-90, 50)
    pause(100)
    chassis.RampLinearDistMoveWithoutBraking(15, 30, 100, 50)
    motions.MoveToRefZone(0, 30, LineSensorSelection.LeftAndRight, LogicalOperators.Greater, 70, AfterMotion.BreakStop)
    pause(100)
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Left, 100)
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 100)
    })
}
let leftGripVegetableColor = 0
let rightGripVegetableColor = 0
let GreenhouseTwoVegetebleColor = 0
let vegetableColors: number[] = []
let vegetableColor = 0
let checkVegetableColor = false
let GreenhouseOneVegetebleColor = 0
let colorTmp = 0
music.setVolume(20)
sensors.SetNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.SetLineSensorsRawRefValues(2476, 1680, 2380, 1588)
// Установить датчику определения фигур минимальные значения RGB
sensors.SetColorSensorMinRgbValues(sensors.color3, 7, 7, 7)
// Установить датчику определения фигур максимальные значения RGB
sensors.SetColorSensorMaxRgbValues(sensors.color3, 94, 101, 68)
sensors.SetHsvlToColorNumParams(sensors.color3, sensors.HsvlToColorNumParams(50, 10, 1, 20, 25, 100, 180, 260))
// Заспамить командой, чтобы датчик цвета включился в режиме цвета
for (let index = 0; index < 10; index++) {
    custom.PreparingSensors()
    pause(10)
}
chassis.setSeparatelyChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setWheelRadius(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(185, MeasurementUnit.Millimeters)
chassis.setSyncRegulatorGains(0.01, 0, 0.5)
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
params.SetLineAlignmentShortParams(40, 0.3, 0.3, 0.5, 0.5)
// Привести захваты в стартовое положение
if (true) {
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Left, 20, 100, false)
        pause(100)
        motors.mediumA.setBrake(true)
        motors.mediumA.stop()
    })
    control.runInParallel(function () {
        grib.LowerGrip(Grip.Right, 20, 100)
        pause(100)
        motors.mediumD.setBrake(true)
        motors.mediumD.stop()
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
        motions.LineFollowToCrossIntersection(AfterMotion.DecelRolling, params.LineFollowFourParams(30, 0.3, 0))
    } else if (brick.buttonDown.wasPressed()) {
        sensors.SearchRgbMinMaxColorSensors(sensors.color3)
        while (true) {
            colorTmp = custom.GetColor(true)
        }
    }
}
brick.showPorts()
brick.setStatusLight(StatusLight.Off)
if (false) {
    // Время после старта, чтобы убрать руки
    pause(100)
    CapturingVegetablesAtStart()
}
if (false) {
    // Время после старта, чтобы убрать руки
    pause(100)
    DumpingCompost()
}
if (false) {
    // Время после старта, чтобы убрать руки
    pause(100)
    UnloadToMarket()
}
if (false) {
    // Время после старта, чтобы убрать руки
    pause(100)
    GreenhouseOne()
} else {
    GreenhouseOneVegetebleColor = 5
}
if (true) {
    // Время после старта, чтобы убрать руки
    pause(100)
    GreenhouseTwo()
}
// Конец программы
pause(5000)
brick.exitProgram()
