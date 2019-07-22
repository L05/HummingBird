import Key from "./key";

class ASharpBFlat extends Key {
    constructor() {
        super();

        super.frequencies = [
            29.14,
            58.27,
            116.54,
            233.08,
            466.16,
            932.33,
            1864.66,
            3729.31,
            7458.62
        ];

        super.acceptances = [
            {lower: 28.32, upper: 30.005},
            {lower: 56.635, upper: 60.005},
            {lower: 113.27, upper: 120.005},
            {lower: 226.54, upper: 240.01},
            {lower: 453.08, upper: 480.02},
            {lower: 906.165, upper: 960.05},
            {lower: 1812.33, upper: 1920.095},
            {lower: 3624.655, upper: 3840.19},
            {lower: 7249.31, upper: 7680.375}
        ]
    }

    name() {
        return 'A♯/B♭';
    }
}

export default new ASharpBFlat();