import Key from "./key";

class A extends Key {
    constructor() {
        super();

        super.frequencies = [
            27.50,
            55.00,
            110.00,
            220.00,
            440.00,
            880.00,
            1760.00,
            3520.00,
            7040.00
        ];

        super.acceptances = [
            {lower: 26.73, upper: 28.32},
            {lower: 53.455, upper: 56.635},
            {lower: 106.915, upper: 113.27},
            {lower: 213.825, upper: 226.54},
            {lower: 427.65, upper: 453.08},
            {lower: 855.305, upper: 906.165},
            {lower: 1710.61, upper: 1812.33},
            {lower: 3421.22, upper: 3624.655},
            {lower: 6842.44, upper: 7249.31}
        ]
    }

    name() {
        return 'A';
    }
}

export default new A();