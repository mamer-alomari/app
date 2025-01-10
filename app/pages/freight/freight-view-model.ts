import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export class FreightViewModel extends Observable {
    constructor() {
        super();
        this.set("address", "940 Strooman Key. Apt 334");
        this.set("distance", "50km");
        this.set("destinationAddress", "940 Strooman Key. Apt 334");
        this.set("eta", "1:30 hr");
        this.set("price", "1,200.00");
    }

    onBack() {
        Frame.topmost().goBack();
    }
}