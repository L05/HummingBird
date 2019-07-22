import Key from "./key";

class D extends Key {
    constructor() {
        super();

        super.frequencies = [
            18.35,
            36.71,
            73.42,
            146.83,
            293.66,
            587.33,
            1174.66,
            2349.32,
            4698.63
        ];

        super.acceptances = [
            {lower: 17.835, upper: 18.9},
            {lower: 35.68, upper: 37.8},
            {lower: 71.36, upper: 75.6},
            {lower: 142.71, upper: 151.195},
            {lower: 285.42, upper: 302.395},
            {lower: 570.85, upper: 604.79},
            {lower: 1141.695, upper: 1209.585},
            {lower: 2283.39, upper: 2419.17},
            {lower: 4566.775, upper: 4838.33}
        ]
    }

    name() {
        return 'D';
    }
}

export default new D();