# WebComponets

### A set of WebComponents &amp; experiments

So, basically I wanted to create some `WebComponent` to use in one of my projects. Now there are different ways of building web components, starting with `plain vanilla JS`, to using different libraries available. I want to build my web components just as standard DOM compliant `custom elements`, so that they can be used in any `HTML` pages, irrespective of which, if any, web framework is used.

That means, I should be able to my `<custom-element>` on any page, whether it's simple `HTML` and `JavaScript`  or an application that uses `Angular`, `React`, `Vue` or any library/framework that'll come in future. Obviously they should run in all _modern_ browsers. Currently, I'll be using them in my `Angular` application though.

After going through lot of documentation, tutorials and videos, and this [super useful compatibility tests](https://custom-elements-everywhere.com/), I decided I'd first try out a few options, and see what works best. So, I'll go with following 3 options

1. [Plain vanilla JS](https://developers.google.com/web/fundamentals/web-components)
2. [LitElement](https://lit-element.polymer-project.org/guide/start)
3. [Angular elements](https://angular.io/guide/elements)
4. [Stencil JS](https://stenciljs.com/docs/introduction)

This repo is actually the set of experiments. And my experience with the tools/libraries.

I made a not-so-complex web component, in all 3 ways, with exact same functionality and styles. Below are my initial findings (which I hope I'll keep up to date with new experiences and new knowledge).

| Area|Plain JavaScript|LitElement|Angular|StencilJS|
|:---|:----|:---|:---|:---|
|Total payload|39kb|160kb|196kb|157kb|
|Load time|~210ms|~290ms|~270ms|~380ms|
|Simplicity of code|Gets complex pretty fast with functional complexity|Quite simple for a standard web component|It's just Angular component with few additional stuffs. So initial setup is elaborate. But once setup, building much complex features is comparatively easier|Initial setup takes some time, then building simple components is not that difficult|
|Compatibility|Need to configure required polyfills|Polyfills auto-configured|Polyfills auto-configured|Polyfills auto-configured and pulled when required|
|Practical usability|It's literally just one file|`LiElement` needs to inject part of the library to provide the easy to use functionalities. Needs a build system in place, which comes with the sample codes|Similar to previous. Only `Angular` might need some custom build configuration to make easy to use single file|`Stencil` theoretically has lot of configurations for the build system, but they are not very well documented. Following the build process and posrting another system as simple `JS` seems complicated. Though it says it has pre-configured options for building `npm package`|
|Code maintainability|Low. `HTML` & `CSS` goes inside `JS` as strings|Better. Though they are all in `JS` by default, there are specific `VS Code` extensions that help with syntax highlight|High. Just like any `Angular` project, components have separate `TS` code, `HTML` and `CSS`. Also because Angular is a full blown framework, it's easier to maintain different services, dependency injection etc.|Follows `JSX` as code, or rather `TSX` when using `TypeScript`, which is well supported. But need to follow their specific constructs & coding practices (same with other libraries also). Kind of closer to `LitElement`, just that it's `JSX`, popular in `React` world|
|Style & Theme|Not easy or maintainable|Similar|Slightly better because of the style separation, and in-built support for `SCSS`/`SASS`/`LESS`|Has default option for separate `CSS` file which is good, also global stylesheets can be passed in, for CSS variables. Does not seem to have default option for `SCSS` and the likes|
|SO questions (July 2020)|🙂|[409](https://stackoverflow.com/questions/tagged/lit-element)|[206](https://stackoverflow.com/questions/tagged/angular-elements)|[364](https://stackoverflow.com/questions/tagged/stenciljs)|

**NOTE:**
1. The payload and load time includes the host page and styles as well, which is actually same for all 3 cases.
2. Load time depends on the network & no. of files though! Should not take as absolute numbers.
3. For `Angular`, a custom build was used to generate a single `JS` file. More info [here](src/angular-elements/README.md). In general, all libraries has their own build systems.

### Project structure

There are 3 projects with independent build systems.

1. `src/angular-elements` => The `Angular` web component (Angular element)
2. `src/lit-element-and-others` => The main project. It has
    1. The `LitElement` web component (`src/lit-element-and-others/src/test-element01.ts`)
    2. The `Vanilla JS` web component (`src/lit-element-and-others/test-element02.js`)
    3. The dev test pages (`src/lit-element-and-others/dev/`)
3. `src/stencil-components` => The `Stencil` web components project

### Build

To run the dev test pages

* Go to `src/lit-element-and-others`
* Run `npm run build` **IF** any change has been made to the `LitElement` web component `TS` file
* The `Vanilla JS` web component is just a `JS` file (see above) so no build is required
* Now run the server with `npm run serve`
* Browse to `http://localhost:8000/dev/index.html` for `LitElement`, or `index2.html` for `plain JS` version, or `index3.html` for `Angular` version

Since the `Angular` component is a separate project, that needs to be build separately **IF** any change is needed there. To build the `Angular` web component

* Go to `src/angular-elements`
* Run `npm run build:elements`
* The updates dev test page can be accessed as described just above

For the `Stencil` project (also another self-sufficient project)

* Go to `src/stencil-components`
* Run `npm run build` to build the project as per configuration given in `stencil.config.ts`
* Run `npm start` to start dev server at `http://localhost:3333` by default

### The capabilities

All three web components have the same set of features

* The have 2 buttons and a text input
* They have a `<slot>` to accommodate any custom `HTML` provided to them
* They can expand/collapse on click of specified button
* Any text entered in `name` text field updates the header
* Clicking on the other button increments an internal counter and shows on the button
* The `collapsed` attribute can be set to collapse the component
* The `metadata` attribute can be set to pre-populate data
* The `metadata` property can also be set from `JS` code
* On change of the `name` text field, they emit an event
* The theme can be controlled externally from the host page (with CSS variables)
* Can take a `commandStore` object as input, which should have 2 methods `increment() => void` and `decrement() => void`, and run methods on that. This object has to be passed separately from `JS` once the component has been initialized

### Note

From experience

* It's not very practical to use `plain vanilla JS` for building `WebComponents` which are fairly complex
* It'd be very helpful to use an established library/framework to help with this
* `LitElement` seems pretty good at what it does, but few things definitely can improve e.g. code separation, automatic two-way binding of properties with user input etc.
* If you're already using `Angular`, it might be great choice given all the full framework capabilities it already has
    * One part I didn't explore much is the `ng build` which generally bundles the user code, vendor code, html and framework code together - how it can be optimised when many components are being built and being used in the same page (like duplication of common code for multiple components) ?
    * And [this](https://stackoverflow.com/questions/62400998/reading-data-from-angular-elements-web-component-in-plain-javascript) seems to be an issue currently with `Angular Elements`, and might be a blocker in some scenarios!
* `Stencil` also seems like a robust libray for building stand-alone web components. It's bit opinionated, and uses `JSX`, but seems stable. BUT, few things to keep in mind
    * They are a `build-tool` rather than a library, so they _"ideally"_ turn your `TSX` code into plain `JS` web component and leave it there. The _"optimized"_ output is just slightly better (in size) than that of others
    * There are few **issues and/or gaps** I've seen while using them, the biggest of them IMO are (note that, they might not be issues at all, depending on your use cases and coding styles) -
    * You [cannot have](https://github.com/ionic-team/stencil/issues/1359) `getter`, `setter` as component properties, you always have to use a plain simple properties only!
    * So, many a times you'll end up creating `@Method` to expose public methods, which [they discourage](https://stenciljs.com/docs/methods) using against 🙄
    * If you use methods, they must be `async`
    * Can [not use](https://github.com/ionic-team/stencil/issues/230) `getter` as method (maybe `setter` too)

