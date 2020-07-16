class TestElement02 extends HTMLElement {

    static get observedAttributes() {
        return ['collapsed', 'metadata'];
    }

    constructor() {
        super();

        this._collapsed = false;        
        this._metadata = '';
        this._commandStore = null;

        this.name = 'World';
        this.count = 0;
    }

    get collapsed() {
        return this._collapsed;
    }

    set collapsed(val) {
        this._collapsed = val;
        this.setAttribute('collapsed', val);
    }

    get metadata() {
        return this._metadata;
    }

    set metadata(val) {
        this._metadata = val;
        this._updateMetadata();
    }

    get commandStore() {
        return this._commandStore;
    }

    set commandStore(val) {
        this._commandStore = val;
    }

    get result() {
        return { name: this.name, count: this.count };
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            if (attrName === 'collapsed') {
                this._collapsed = newValue?.toLowerCase() === 'true' ? true : false;
            }
            if (attrName === 'metadata') {
                this._updateMetadata(); // through we don't really this attribute to update
            }
            if (attrName === 'commandStore') {
                console.log(newValue);
            }
        }
    }
    
    onClick = () => {
        this.count++;
        this.shadowRoot.querySelector('#clkBtn').innerHTML = `Click Count: ${this.count}`;
    }
    toggle = () => {
        this._collapsed = !this._collapsed;
        this.updateCollapsedState();
    }
    updateCollapsedState = () => {
        if (this.collapsed) {
            this.shadowRoot.querySelector('.box').classList.add('collapsed');
            this.shadowRoot.querySelector('#tglBtn').innerHTML = 'Expand ↓';
        } else {
            this.shadowRoot.querySelector('.box').classList.remove('collapsed');
            this.shadowRoot.querySelector('#tglBtn').innerHTML = 'Collapse ↑';
        }
    }
    syncName = (event) => {
        const nm = event.target.value;
        this.name = nm ? nm : 'World';
        this.shadowRoot.querySelector('h1').innerHTML = `Hello, ${this.name}!`;
    }
    increment = () => {
        let amount = this.shadowRoot.querySelector('#amount').value;
        if (!amount) amount = '1';
        this._commandStore.increment(parseInt(amount));
    }
    decrement = () => {
        let amount = this.shadowRoot.querySelector('#amount').value;
        if (!amount) amount = '1';
        this._commandStore.decrement(parseInt(amount));
    }
    _updateMetadata() {
        if (this.metadata) {
            const parsedMetadata = typeof this.metadata === 'string'
                ? JSON.parse(this.metadata)
                : this.metadata;
            if (parsedMetadata) {
                this.count = parsedMetadata.count;
                this.name = parsedMetadata.name;
                this.shadowRoot.querySelector('#clkBtn').innerHTML = `Click Count: ${this.count}`;
                this.shadowRoot.querySelector('h1').innerHTML = `Hello, ${this.name}!`;
                this.shadowRoot.querySelector('#name').placeholder = this.name;
            }
            else {
                console.error(`Invalid metadata value!`);
                console.error(this.metadata);
            }
        }
    }
    _notify = () => { // NOTE: Cannot read element properties if function NOT arrow!
        const notifyEvent = new CustomEvent('data-update', { 
            detail: { 
                elementId: this.id,
                property: 'name',
                value: this.name,
            },
            bubbles: true, // go up the DOM
            composed: true, // go through ShadowDom
        });
        this.dispatchEvent(notifyEvent);
    }

    connectedCallback() {

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
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
            </style>
            <h1>Hello, ${this.name}!</h1>
            Name: <input id="name" type="text" placeholder="${this.name}" />
            <button id="tglBtn" class="float-right">Collapse ↑</button>
            <div class="box">
                <button id="clkBtn">
                    Click Count: 0
                </button>
                <slot></slot>
                Update amount: <input id="amount" type="number" placeholder="0" />
                <button id="increment">Increment</button>
                <button id="decrement">Decrement</button>
            </div>
        `;

        this.shadowRoot.querySelector('#tglBtn').addEventListener('click', this.toggle);
        this.shadowRoot.querySelector('#clkBtn').addEventListener('click', this.onClick);
        this.shadowRoot.querySelector('#name').addEventListener('input', this.syncName);
        this.shadowRoot.querySelector('#name').addEventListener('change', this._notify);
        this.shadowRoot.querySelector('#increment').addEventListener('click', this.increment);
        this.shadowRoot.querySelector('#decrement').addEventListener('click', this.decrement);

        this.metadata = this.getAttribute('metadata');
        this._updateMetadata();
        this.updateCollapsedState();
    }
}

customElements.define('test-element02', TestElement02);