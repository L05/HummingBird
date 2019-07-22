import Key from "./key";

class GSharpAFlat extends Key {
    constructor() {
        super();

        super.frequencies = [
            25.96,
            51.91,
            103.83,
            207.65,
            415.30,
            830.61,
            1661.22,
            3322.44,
            6644.88
        ];

        super.acceptances = [
            {lower: 25.23, upper: 26.73},
            {lower: 50.455, upper: 53.455},
            {lower: 100.915, upper: 106.915},
            {lower: 201.825, upper: 213.825},
            {lower: 403.65, upper: 427.65},
            {lower: 807.3, upper: 855.305},
            {lower: 1614.6, upper: 1710.61},
            {lower: 3229.2, upper: 3421.22},
            {lower: 6458.405, upper: 6842.44}
        ]
    }

    name() {
        return 'G♯/A♭';
    }
}

export default new GSharpAFlat();