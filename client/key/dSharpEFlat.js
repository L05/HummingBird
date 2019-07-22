import Key from "./key";

class DSharpEFlat extends Key {
    constructor() {
        super();

        super.frequencies = [
            19.45,
            38.89,
            77.78,
            155.56,
            311.13,
            622.25,
            1244.51,
            2489.02,
            4978.03
        ];

        super.acceptances = [
            {lower: 18.9, upper: 20.025},
            {lower: 37.8, upper: 40.045},
            {lower: 75.6, upper: 80.095},
            {lower: 151.195, upper: 160.185},
            {lower: 302.395, upper: 320.38},
            {lower: 604.79, upper: 640.75},
            {lower: 1209.585, upper: 1281.51},
            {lower: 2419.17, upper: 2563.02},
            {lower: 4838.33, upper: 5126.035}
        ]
    }

    name() {
        return 'D♯/E♭';
    }
}

export default new DSharpEFlat();