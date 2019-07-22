import Key from "./key";

class CSharpDFlat extends Key {
    constructor() {
        super();

        super.frequencies = [
            17.32,
            34.65,
            69.30,
            138.59,
            277.18,
            554.37,
            1108.73,
            2217.46,
            4434.92
        ];

        super.acceptances = [
            {lower: 16.835, upper: 17.835},
            {lower: 33.675, upper: 35.68},
            {lower: 67.355, upper: 71.36},
            {lower: 134.7, upper: 142.71},
            {lower: 269.405, upper: 285.42},
            {lower: 538.81, upper: 570.85},
            {lower: 1077.615, upper: 1141.695},
            {lower: 2155.23, upper: 2283.39},
            {lower: 4310.465, upper: 4566.775}
        ]
    }

    name() {
        return 'C♯/D♭';
    }
}

export default new CSharpDFlat();