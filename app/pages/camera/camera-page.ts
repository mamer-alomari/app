import { NavigatedData, Page } from '@nativescript/core';
import { CameraViewModel } from './camera-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new CameraViewModel(page);
}