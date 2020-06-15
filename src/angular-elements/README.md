# Web Component with AngularElements

Some information along the way

When we build an angular project, it mainly creates the following files

1. runtime.js => a bit of initial glue code for webpack ??
2. polyfills.js => polyfills
3. main.js => my components ts code + html + framework ??
4. scripts.js => ??
5. styles.css => styles

## Custom build

To build and pack the `WebComponent` as a single file, run the following command

> npm run build:elements

The custom build step is defined in `elements-build.js`. It'll build following set of outputs

1. `dist/angularElements` => Standard `Angular` build output files
2. `dist/web_component` => The `WebComponent` as a single `JS` file & `CSS` styles

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
