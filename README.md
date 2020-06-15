# WebComponets

### A set of WebComponents &amp; experiments

So, basically I wanted to create some `WebComponent` to use in one of my projects. Now there are different ways of building web components, starting with `plain vanilla JS`, to using different libraries available. I want to build my web components just as standard DOM compliant `custom elements`, so that they can be used in any `HTML` pages, irrespective of which, if any, web framework is used.

Thats means, I should be able to my `<custom-element>` on any page, whether it's simple `HTML` and `JavaScript`  or an application that uses `Angular`, `React`, `Vue` or any library/framework that'll come in future. Obviously they should run in all _modern_ browsers. Currently, I'll be using them in my `Angular` application though.

After going through lot of documentation, tutorials and videos, and this [super useful compatibility tests](https://custom-elements-everywhere.com/), I decided I'd fast try out a few options, and see what works best. So, I'll go with following 3 options

1. [Plain vanilla JS](https://developers.google.com/web/fundamentals/web-components)
2. [LitElement](https://lit-element.polymer-project.org/guide/start)
3. [Angular elements](https://angular.io/guide/elements)

This repo is actually the set of experiments.

I made a not-so-complex web component, in all 3 ways, with exact same functionality and styles. Below are my initial findings (which I hope I'll keep up to date with new experiences and new knowledge).

| Area|Plain JavaScript|LitElement|Angular|
|:---|:----|:---|:---|
|Total payload|39kb|160kb|196kb|
|Load time|~210ms|~290ms|~270ms|
|Simplicity of code|Gets complex pretty fast with functional complexity|Quite simple for a standard web component|It's just Angular component with few additional stuffs. So initial setup is elaborate. But once setup, building much complex features is comparatively easier|
|Compatibility|Need to configure required polyfills|Polyfills auto-configured|Polyfills auto-configured|
|Practical usability|It's literally just one file|`LiElement` needs to inject part of the library to provide the easy to use functionalities. Needs a build system in place, which comes with the sample codes|Similar to previous. Only `Angular` might need some custom build configuration to make easy to use single file|
|Code maintainability|Low. `HTML` & `CSS` goes inside `JS` as strings|Better. Though they are all in `JS` by default, there are specific `VS Code` extensions that help with syntax highlight|High. Just like any `Angular` project, components have separate `TS` code, `HTML` and `CSS`. Also because Angular is a full blown framework, it's easier to maintain different services, dependency injection etc.|
|Style & Theme|Not easy or maintainable|Similar|Slightly better because of the style separation, and in-built support for `SCSS`/`SASS`/`LESS`|

**NOTE:**
1. The payload and load time includes the host page and styles as well, which is actually same for all 3 cases.
2. Load time depends on the network & no. of files though!
3. For `Angular`, a custom build was used to generate a sigle `JS` file. More info [here](src/angular-elements/README.md).
