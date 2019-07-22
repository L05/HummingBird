import Key from "./key";

class G extends Key {
    constructor() {
        super();

        super.frequencies = [
            24.50,
            49.00,
            98.00,
            196.00,
            392.00,
            783.99,
            1567.98,
            3135.96,
            6271.93
        ];

        super.acceptances = [
            {lower: 23.81, upper: 25.23},
            {lower: 47.625, upper: 50.455},
            {lower: 95.25, upper: 100.915},
            {lower: 190.5, upper: 201.825},
            {lower: 380.995, upper: 403.65},
            {lower: 761.99, upper: 807.3},
            {lower: 1523.98, upper: 1614.6},
            {lower: 3047.96, upper: 3229.2},
            {lower: 6095.92, upper: 6458.405}
        ]
    }

    name() {
        return 'G';
    }
}

export default new G();