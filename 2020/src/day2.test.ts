import {data} from "./day2"

test("Day two, part 1, do it", () => {
    var number = 0;
    data.forEach(entry => {
        var stuff = entry.split(/[:\s-]/)
        var lowest = parseInt(stuff[0]);
        var highest = parseInt(stuff[1]);
        var letter = stuff[2];
        var password = stuff[4];
        var count = [...password].filter(char => char === letter).length;
    
        if((lowest <= count) && (count <= highest)) {
            number++;
        }
    })
    expect(number).toBe(424);
})

test("Day two, part 2, do it", () => {
    var number = 0;
    data.forEach(entry => {
        var stuff = entry.split(/[:\s-]/)
        var lowest = parseInt(stuff[0]);
        var highest = parseInt(stuff[1]);
        var letter = stuff[2];
        var password = stuff[4];
        if(
            ([...password][lowest-1] === letter && [...password][highest-1] !== letter)
            ||
            ([...password][lowest-1] !== letter && [...password][highest-1] === letter)
        ) {
            number++;
        }
    })
    expect(number).toBe(747);
})