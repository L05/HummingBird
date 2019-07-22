import A from './a';
import ASharpBFlat from './aSharpBFlat';
import B from './b';
import C from './c';
import CSharpDFlat from './cSharpDFlat';
import D from './d';
import DSharpEFlat from './dSharpEFlat';
import E from './e';
import F from './f';
import FSharpGFlat from './fSharpGFlat';
import G from './g';
import GSharpAFlat from './gSharpAFlat';

class KeyLookup {
    constructor() {
        this.keys = [C, CSharpDFlat, D, DSharpEFlat, E, F, FSharpGFlat, G, GSharpAFlat, A, ASharpBFlat, B];
    }

    getKey(freq) {
        for (let i = 0; i < this.keys.length; i++) {
            const key = this.keys[i];

            if (key.isFrequency(freq)) {
                return key;
            }
        }
    }
}

export default new KeyLookup();