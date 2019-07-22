import Key from "./key";

class B extends Key {
    constructor() {
        super();

        super.frequencies = [
            30.87,
            61.74,
            123.47,
            246.94,
            493.88,
            987.77,
            1975.53,
            3951.07,
            7902.13
        ];

        super.acceptances = [
            {lower: 30.005     ,upper: 31.785},
            {lower: 60.005, upper: 63.575},
            {lower: 120.005, upper: 127.14},
            {lower: 240.01, upper: 254.285},
            {lower: 480.02, upper: 508.565},
            {lower: 960.05, upper: 1017.135},
            {lower: 1920.095, upper: 2034.265},
            {lower: 3840.19, upper: 4068.54},
            {lower: 7680.375, upper: null}
        ]
    }

    name() {
        return 'B';
    }
}

export default new B();