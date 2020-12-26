import {is2020, data, istriple2020} from "./day1"

test("Day one, check for correct sum", () => {
    expect(is2020(1,2019)).toBe(true);
    expect(is2020(232,1788)).toBe(true);
})

test("Day one, check for incorrect sum", () => {
    expect(is2020(1,2020)).toBe(false);
    expect(is2020(231,188)).toBe(false);
})

test("Day one, part one, calculate", () => {
    var result: number = 0;
    data.forEach((value, index) => {
        for(var start: number = index+1; start <= data.length +1 ; start++) {
            if(is2020(value, data[start])) {
                result = value * data[start]
            }
        }
    })
    expect(result).toBe(1016964);
})

test("Day one, part two, calculate", () => {
    var result: number = 0;
    data.forEach((value, index) => {
        var second = data.slice(index+1, data.length);
        second.forEach((secondvalue, secondindex) => {
            for(var start: number = secondindex+1; start <= second.length +1 ; start++) {
                if(istriple2020(value, secondvalue, second[start])) {
                    result = value * secondvalue * second[start];
                }
            }
        })
    })
    expect(result).toBe(182588480);
})