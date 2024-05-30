namespace custom {
    
    /**
     * Предварительный запуск датчиков внужный режим.
     */
    //% blockId="PreparingSensors"
    //% block="preparing sensors"
    //% block.loc.ru="подготовка сенсоров"
    //% weight="88"
    export function PreparingSensors() {
        sensors.color3.rgbRaw();
        sensors.nxtLight1.light(NXTLightIntensityMode.ReflectedRaw);
        sensors.nxtLight4.light(NXTLightIntensityMode.ReflectedRaw);
    }

    /**
     * Предварительный запуск датчиков внужный режим.
     */
    //% blockId="GetColor"
    //% block="get color||debug $debug"
    //% block.loc.ru="получить цвет||отладка $debug"
    //% inlineInputMode="inline"
    //% expandableArgumentMode="enabled"
    //% debug.shadow="toggleOnOff"
    //% weight="79"
    export function GetColor(debug: boolean = false): number {
        const rgbCS = sensors.color3.rgbRaw(); // Нормализуем значения с датчика
        for (let i = 0; i <= 2; i++) {
            rgbCS[i] = Math.map(rgbCS[i], sensors.GetMinRgbColorSensor(sensors.color3)[i], sensors.GetMaxRgbColorSensor(sensors.color3)[i], 0, 255);
            rgbCS[i] = Math.constrain(rgbCS[i], 0, 255);
        }
        const hsvlCS = sensors.RgbToHsvlConverter(rgbCS); // Получаем HSVL
        const color = sensors.HsvlToColorNum(hsvlCS, sensors.GetHsvlToColorNumParams(sensors.color3)); // Переводим HSVL в цветовой код
        if (debug) {
            const column = 20;
            brick.clearScreen();
            brick.printValue("r", rgbCS[0], 1, column);
            brick.printValue("g", rgbCS[1], 2, column);
            brick.printValue("b", rgbCS[2], 3, column);
            brick.printValue("hue", hsvlCS[0], 5, column);
            brick.printValue("sat", hsvlCS[1], 6, column);
            brick.printValue("val", hsvlCS[2], 7, column);
            brick.printValue("light", hsvlCS[3], 8, column);
            brick.printValue("color", color, 10, column);
        }
        return color;
    }
}

const enum Grip {
    //% block="left"
    //% block.loc.ru="левый"
    Left,
    //% block="right"
    //% block.loc.ru="правый"
    Right
}

/**
 * Grib metods.
 * Методы захвата.
 */
//% block="Grib"
//% block.loc.ru="Захват"
//% color="#6D5BA5" weight="95" icon="\uf259"
namespace grib {

    /**
     * Захват отпустить до конца.
     * @param grip каким захватом работать, eg: Grip.Left
     * @param speed скорость мотора, eg: 50
     * @param stalledDetectionDelay время до начала ожидания стопора, eg: 0
     * @param hold удерживать ли после остановки мотор, eg: true
     */
    //% blockId="LowerGrip"
    //% block="lower $grip grip at speed $speed||time until the stopper wait countdown $stalledDetectionDelay|hold $hold"
    //% block.loc.ru="отпустить $grip захват на скорости $speed||время до отсчёта ожидания стопора $stalledDetectionDelay|удержание $hold"
    //% inlineInputMode="inline"
    //% expandableArgumentMode="enabled"
    //% hold.shadow="toggleOnOff"
    //% weight="99"
    export function LowerGrip(grip: Grip, speed: number, stalledDetectionDelay: number = 0, hold: boolean = true) {
        let motor: motors.Motor;
        if (grip == Grip.Left) motor = motors.mediumA;
        else if (grip == Grip.Right) motor = motors.mediumD;
        else return;
        motor.run(Math.abs(speed) * -1);
        pause(stalledDetectionDelay);
        motor.pauseUntilStalled();
        motor.setBrake(hold);
        motor.stop();
    }

    /**
     * Захват поднять до конца.
     * @param grip каким захватом работать, eg: Grip.Left
     * @param speed скорость мотора, eg: 50
     * @param stalledDetectionDelay время до начала ожидания стопора, eg: 0
     * @param hold удерживать ли после остановки мотор, eg: true
     */
    //% blockId="LiftGrip"
    //% block="lift $grip grip at speed $speed||time until the stopper wait countdown $stalledDetectionDelay|hold $hold"
    //% block.loc.ru="поднять $grip захват на скорости $speed||время до отсчёта ожидания стопора $stalledDetectionDelay|удержание $hold"
    //% inlineInputMode="inline"
    //% expandableArgumentMode="enabled"
    //% hold.shadow="toggleOnOff"
    //% weight="99"
    export function LiftGrip(grip: Grip, speed: number, stalledDetectionDelay: number = 0, hold: boolean = true) {
        let motor: motors.Motor;
        if (grip == Grip.Left) motor = motors.mediumA;
        else if (grip == Grip.Right) motor = motors.mediumD;
        else return;
        motor.run(Math.abs(speed));
        pause(stalledDetectionDelay);
        motor.pauseUntilStalled();
        motor.setBrake(hold);
        motor.stop();
    }

}