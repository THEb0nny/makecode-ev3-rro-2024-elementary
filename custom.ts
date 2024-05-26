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
        else if (grip == Grip.Right) motor = motors.mediumC;
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
        else if (grip == Grip.Right) motor = motors.mediumC;
        else return;
        motor.run(Math.abs(speed));
        pause(stalledDetectionDelay);
        motor.pauseUntilStalled();
        motor.setBrake(hold);
        motor.stop();
    }

}