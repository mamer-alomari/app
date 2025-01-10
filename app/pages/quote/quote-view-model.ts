import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export class QuoteViewModel extends Observable {
    private _items: any[];
    private _selectedCount: number;

    constructor() {
        super();
        this._selectedCount = 0;
        this._items = [
            { icon: "~/images/armchair.png", name: "Arm Chairs", size: "Small", selected: false },
            { icon: "~/images/sofa.png", name: "3 Seater Sofa", size: "Large", selected: false },
            { icon: "~/images/lamp.png", name: "Desk Lamp", size: "Room - Medium", selected: false },
            { icon: "~/images/pillow.png", name: "Throw Pillows", size: "Medium", selected: false }
        ];
        this.notifyPropertyChange('items', this._items);
    }

    get items(): any[] {
        return this._items;
    }

    get selectedCount(): number {
        return this._selectedCount;
    }

    onToggleItem(args) {
        const item = args.object.bindingContext;
        item.selected = !item.selected;
        this._selectedCount += item.selected ? 1 : -1;
        this.notifyPropertyChange('selectedCount', this._selectedCount);
    }

    onViewCart() {
        Frame.topmost().navigate({
            moduleName: "pages/cart/cart-page"
        });
    }

    onBack() {
        Frame.topmost().goBack();
    }

    onOpenCamera() {
        Frame.topmost().navigate({
            moduleName: "pages/camera/camera-page"
        });
    }
}