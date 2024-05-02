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
        // Сортируем массив для более эффективного подсчета частоты
        arr.sort((a, b) => a - b);

        let maxCount = 0;
        let currentNum = arr[0];
        let mostFrequentNum = arr[0];
        let currentCount = 1;

        // Проходим по отсортированному массиву, подсчитывая частоту каждого числа
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === currentNum) {
                currentCount++;
            } else {
                if (currentCount > maxCount) {
                    maxCount = currentCount;
                    mostFrequentNum = currentNum;
                }
                currentNum = arr[i];
                currentCount = 1;
            }
        }

        // Проверяем последнее число
        if (currentCount > maxCount) {
            mostFrequentNum = currentNum;
        }

        return mostFrequentNum;
    }

}