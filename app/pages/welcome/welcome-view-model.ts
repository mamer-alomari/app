import { Observable, Frame } from '@nativescript/core';

export class WelcomeViewModel extends Observable {
    constructor() {
        super();
    }

    onGetStarted() {
        Frame.topmost().navigate({
            moduleName: "pages/quote/quote-page",
            clearHistory: true
        });
    }

    onLogin() {
        console.log("Login tapped");
    }
}