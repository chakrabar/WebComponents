const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/angularElements/runtime.js',
        './dist/angularElements/polyfills-es5.js',
        './dist/angularElements/scripts.js',
        './dist/angularElements/main.js',
    ]
    await fs.ensureDir('dist/es5_web_component')
    await concat(files, 'dist/es5_web_component/test-element03.js');
    await fs.copyFile('./dist/angularElements/styles.css', 'dist/es5_web_component/styles.css')
    // await fs.copy('./dist/angularElements/assets/', 'elements/assets/' )
    
})()