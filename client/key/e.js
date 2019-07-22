import Key from "./key";

class E extends Key {
    constructor() {
        super();

        super.frequencies = [
            20.60,
            41.20,
            82.41,
            164.81,
            329.63,
            659.25,
            1318.51,
            2637.02,
            5274.04
        ];

        super.acceptances = [
            {lower: 20.025, upper: 21.215},
            {lower: 40.045, upper: 42.425},
            {lower: 80.095, upper: 84.86},
            {lower: 160.185, upper: 169.71},
            {lower: 320.38, upper: 339.43},
            {lower: 640.75, upper: 678.855},
            {lower: 1281.51, upper: 1357.71},
            {lower: 2563.02, upper: 2715.425},
            {lower: 5126.035, upper: 5430.845}
        ]
    }

    name() {
        return 'E';
    }
}

export default new E();