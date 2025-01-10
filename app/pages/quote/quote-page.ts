import { NavigatedData, Page } from '@nativescript/core';
import { QuoteViewModel } from './quote-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new QuoteViewModel();
}