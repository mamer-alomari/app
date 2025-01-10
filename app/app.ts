import { Application } from '@nativescript/core';
import { registerElement } from '@nativescript/core';
import { MapView } from '@nativescript/google-maps';

registerElement('MapView', () => MapView);

Application.run({ moduleName: 'app-root' });