namespace custom {

    /**
     * Поиск часто встречающегося элемента в массиве.
     * @param arr массив с элементами
     */
    //% blockId="MostFrequentNumber"
    //% block="get the most common element from $arr| array"
    //% block.loc.ru="получить наиболее часто встречающийся элемент из массива $arr"
    //% weight="89"
    export function MostFrequentNumber(arr: number[]): number {
        // Создаем объект для подсчета встречающихся значений
        let counts: number[];
        let maxCount = 0;
        let mostFrequentElement = null;

        // Проходимся по массиву и увеличиваем счетчик для каждого элемента
        for (let i = 0; i < arr.length; i++) {
            let element = arr[i];
            if (counts[element] === undefined) {
                counts[element] = 1;
            } else {
                counts[element]++;
            }
            // Обновляем максимальное количество встреч для элемента
            if (counts[element] > maxCount) {
                maxCount = counts[element];
                mostFrequentElement = element;
            }
        }
        return mostFrequentElement;
    }

}