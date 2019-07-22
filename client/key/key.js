
class Key {
    constructor() {
        this.frequencies = [];
        this.acceptances = [];
    }

    name() {
        return '';
    }

    isFrequency(freq) {
        for (let i = 0; i < this.acceptances.length; i++) {
            const acceptance = this.acceptances[i];
            const lower = acceptance.lower || 0;
            const upper = acceptance.upper || 16000;

            if (freq >= lower && freq < upper) {
                return true;
            }
        }
        return false;
    }
}

export default Key;