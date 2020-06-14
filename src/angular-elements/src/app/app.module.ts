import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
// import { AppComponent } from './app.component';
import { TestElement03Component } from './test-element03/test-element03.component';

// this is the main module
@NgModule({
    declarations: [
        // AppComponent, // a sample component
        TestElement03Component // our web component
    ],
    entryComponents: [
        TestElement03Component // have the context & will start up WHEN NEEDED
        // to use outside angular i.e. independently
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
    // bootstrap: [TestElement03Component] // [AppComponent] <== do not try to render the component
    // i.e. start up the module, but DO NOT start up the component
})
export class AppModule {
    constructor(private injector: Injector) { }

    ngDoBootstrap() {
        // define the custom element in angular way
        const custElement = createCustomElement(TestElement03Component, { injector: this.injector });
        // register the web component the standard way
        customElements.define('test-element03', custElement);
    }
}
