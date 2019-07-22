import Key from "./key";

class F extends Key {
    constructor() {
        super();

        super.frequencies = [
            21.83,
            43.65,
            87.31,
            174.61,
            349.23,
            698.46,
            1396.91,
            2793.83,
            5587.65
        ];

        super.acceptances = [
            {lower: 21.215, upper: 22.475},
            {lower: 42.425, upper: 44.95},
            {lower: 84.86, upper: 89.905},
            {lower: 169.71, upper: 179.805},
            {lower: 339.43, upper: 359.61},
            {lower: 678.855, upper: 719.225},
            {lower: 1357.71, upper: 1438.445},
            {lower: 2715.425, upper: 2876.895},
            {lower: 5430.845, upper: 5753.78}
        ]
    }

    name() {
        return 'F';
    }
}

export default new F();