import { EventHandler } from './event-handler.js';

export class Dices extends EventHandler {
    constructor(dices) {
        super();
        this._dices = dices;
    }
}
