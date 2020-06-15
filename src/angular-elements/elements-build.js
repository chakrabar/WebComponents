// ARGHYA: Custom build to generate single file web component
const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/angularElements/polyfills-es2015.js',
        './dist/angularElements/runtime-es2015.js',
        // './dist/angularElements/scripts.js', // ARGHYA: is it required?
        './dist/angularElements/main-es2015.js',
    ]
    await fs.ensureDir('dist/web_component')
    await concat(files, 'dist/web_component/test-element03.js');
    await fs.copyFile('./dist/angularElements/styles.css', 'dist/web_component/styles.css')
    // await fs.copy('./dist/angularElements/assets/', 'elements/assets/' )
    
    // NOTE: This is just to help this current project setup
    await fs.copyFile('./dist/web_component/test-element03.js', '../lit-element-and-others/angular-components/test-element03.js')
    await fs.copyFile('./dist/web_component/styles.css', '../lit-element-and-others/angular-components/styles.css')
})()

// ES5
// {
//     "compileOnSave": false,
//     "compilerOptions": {
//         "baseUrl": "./",
//         "downlevelIteration": true,
//         "outDir": "./dist/out-tsc",
//         "sourceMap": true,
//         "declaration": false,
//         "module": "CommonJS", //"esnext",
//         "moduleResolution": "node",
//         "emitDecoratorMetadata": true,
//         "experimentalDecorators": true,
//         "importHelpers": true,
//         "target": "ES5", // es2015
//         "typeRoots": [
//             "node_modules/@types"
//         ],
//         "lib": [
//             "es2018",
//             "dom"
//         ]
//     }
// }
// const fs = require('fs-extra');
// const concat = require('concat');
// (async function build() {
//     const files = [
//         './dist/angularElements/runtime.js',
//         './dist/angularElements/polyfills-es5.js',
//         './dist/angularElements/scripts.js',
//         './dist/angularElements/main.js',
//     ]
//     await fs.ensureDir('dist/es5_web_component')
//     await concat(files, 'dist/es5_web_component/test-element03.js');
//     await fs.copyFile('./dist/angularElements/styles.css', 'dist/es5_web_component/styles.css')
//     // await fs.copy('./dist/angularElements/assets/', 'elements/assets/' )
// })()