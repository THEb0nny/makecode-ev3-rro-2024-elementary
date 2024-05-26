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