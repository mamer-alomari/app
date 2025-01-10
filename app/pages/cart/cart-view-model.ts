import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export class CartViewModel extends Observable {
    private _cartItems: any[];

    constructor() {
        super();
        this._cartItems = [
            { icon: "~/images/armchair.png", name: "Arm Chairs", size: "Small", quantity: 1 },
            { icon: "~/images/sofa.png", name: "3 Seater Sofa", size: "Large", quantity: 2 },
            { icon: "~/images/armchair.png", name: "Arm Chairs", size: "Small", quantity: 1 },
            { icon: "~/images/sofa.png", name: "3 Seater Sofa", size: "Large", quantity: 2 }
        ];
        this.notifyPropertyChange('cartItems', this._cartItems);
    }

    get cartItems(): any[] {
        return this._cartItems;
    }

    onIncreaseQuantity(args) {
        const item = args.object.bindingContext;
        item.quantity++;
        this.notifyPropertyChange('cartItems', this._cartItems);
    }

    onDecreaseQuantity(args) {
        const item = args.object.bindingContext;
        if (item.quantity > 1) {
            item.quantity--;
            this.notifyPropertyChange('cartItems', this._cartItems);
        }
    }

    onRemoveItem(args) {
        const item = args.object.bindingContext;
        const index = this._cartItems.indexOf(item);
        if (index > -1) {
            this._cartItems.splice(index, 1);
            this.notifyPropertyChange('cartItems', this._cartItems);
        }
    }

    onGetQuote() {
        Frame.topmost().navigate({
            moduleName: "pages/freight/freight-page"
        });
    }

    onBack() {
        Frame.topmost().goBack();
    }
}