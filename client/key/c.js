import Key from "./key";

class C extends Key {
    constructor() {
        super();

        super.frequencies = [
            16.35,
            32.70,
            65.41,
            130.81,
            261.63,
            523.25,
            1046.50,
            2093.00,
            4186.01
        ];

        super.acceptances = [
            {lower: null, upper: 16.835},
            {lower: 31.785, upper: 33.675},
            {lower: 63.575, upper: 67.355},
            {lower: 127.14, upper: 134.7},
            {lower: 254.285, upper: 269.405},
            {lower: 508.565, upper: 538.81},
            {lower: 1017.135, upper: 1077.615},
            {lower: 2034.265, upper: 2155.23},
            {lower: 4068.54, upper: 4310.465}
        ]
    }

    name() {
        return 'C';
    }
}

export default new C();