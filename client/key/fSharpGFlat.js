import Key from "./key";

class FSharpGFlat extends Key {
    constructor() {
        super();

        super.frequencies = [
            23.12,
            46.25,
            92.50,
            185.00,
            369.99,
            739.99,
            1479.98,
            2959.96,
            5919.91
        ];

        super.acceptances = [
            {lower: 22.475, upper: 23.81},
            {lower: 44.95, upper: 47.625},
            {lower: 89.905, upper: 95.25},
            {lower: 179.805, upper: 190.5},
            {lower: 359.61, upper: 380.995},
            {lower: 719.225, upper: 761.99},
            {lower: 1438.445, upper: 1523.98},
            {lower: 2876.895, upper: 3047.96},
            {lower: 5753.78, upper: 6095.92}
        ]
    }

    name() {
        return 'F♯/G♭';
    }
}

export default new FSharpGFlat();