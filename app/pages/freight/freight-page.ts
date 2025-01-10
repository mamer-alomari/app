import { NavigatedData, Page } from '@nativescript/core';
import { FreightViewModel } from './freight-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new FreightViewModel();
}