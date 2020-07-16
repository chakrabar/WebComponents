var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from 'lit-element';
import { ElementMetadata } from './elementMetadata';
import { CommandStore } from './commandStore';
/**
 * An example element
 */
let TestElement01 = class TestElement01 extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'World';
        this.count = 0;
        this.collapsed = false;
        this._metadata = '';
    }
    get metadata() {
        return this._metadata;
    }
    set metadata(value) {
        // const oldValue = this._metadata;
        this._metadata = value;
        // this.requestUpdate('metadata', oldValue);
        this._updateMetadata(); // this is actually object
    }
    set commandStore(value) {
        this._commandStore = value;
    }
    get result() {
        return new ElementMetadata(this.name, this.count);
    }
    render() {
        return html `
        <h1>Hello, ${this.name}!</h1>
        Name: <input type="text" @change=${this._notify} @input=${this._syncName} placeholder="${this.name}" />
        <button class="float-right" @click=${this._toggle}>${this.collapsed ? 'Expand ↓' : 'Collapse ↑'}</button>
        <div class="box ${this.collapsed ? 'collapsed' : ''}">
            <button @click=${this._onClick} part="button">
                Click Count: ${this.count}
            </button>
            <slot></slot>
            Update amount: <input id="amount" type="number" placeholder="0" />
            <button @click=${this._increment}>Increment</button>
            <button @click=${this._decrement}>Decrement</button>
        </div>
        `;
    }
    _increment() {
        var _a, _b;
        let amount = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#amount')).value;
        if (!amount)
            amount = '1';
        (_b = this._commandStore) === null || _b === void 0 ? void 0 : _b.increment(parseInt(amount));
    }
    _decrement() {
        var _a, _b;
        let amount = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#amount')).value;
        if (!amount)
            amount = '1';
        (_b = this._commandStore) === null || _b === void 0 ? void 0 : _b.decrement(parseInt(amount));
    }
    _onClick() {
        this.count++;
    }
    _toggle() {
        this.collapsed = !this.collapsed;
    }
    _syncName(event) {
        const value = event.target.value;
        this.name = value ? value : 'World';
    }
    _updateMetadata() {
        if (this.metadata) {
            const parsedMetadata = typeof this.metadata === 'string'
                ? JSON.parse(this.metadata)
                : this.metadata;
            if (parsedMetadata) {
                this.count = parsedMetadata.count;
                this.name = parsedMetadata.name;
            }
            else {
                console.error(`Invalid metadata value!`);
                console.error(this.metadata);
            }
        }
    }
    _notify() {
        const notifyEvent = new CustomEvent('data-update', {
            detail: {
                elementId: this.id,
                property: 'name',
                value: this.name,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(notifyEvent);
    }
};
TestElement01.styles = css `
        :host {
            display: block;
            border: solid 1px gray;
            padding: 16px;
            max-width: 800px;
            color: var(--primary-color, darkgrey);
            background-color: var(--background-color, white);
            font-family: var(--font-family, sans-serif);
        }
        button {
            font-family: var(--font-family, sans-serif);
        }
        input {
            font-family: var(--font-family, sans-serif);
        }
        .box {
            padding: 10px;
        }
        .float-right {
            float: right;
        }
        div.collapsed {
            display: none;
        }
    `;
__decorate([
    property()
], TestElement01.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], TestElement01.prototype, "count", void 0);
__decorate([
    property({ type: Boolean })
], TestElement01.prototype, "collapsed", void 0);
__decorate([
    property() // {attribute: false} to make non-attribute BUT we do want to keep attribute too
], TestElement01.prototype, "metadata", null);
__decorate([
    property({ attribute: false, type: CommandStore })
], TestElement01.prototype, "commandStore", null);
__decorate([
    property({ attribute: false, type: ElementMetadata })
], TestElement01.prototype, "result", null);
TestElement01 = __decorate([
    customElement('test-element01')
], TestElement01);
export { TestElement01 };
//# sourceMappingURL=test-element01.js.map