const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/angularElements/runtime.js',
        './dist/angularElements/polyfills-es5.js',
        './dist/angularElements/scripts.js',
        './dist/angularElements/main.js',
    ]
    await fs.ensureDir('elements')
    await concat(files, 'elements/test-element03.js');
    await fs.copyFile('./dist/angularElements/styles.css', 'elements/styles.css')
    // await fs.copy('./dist/angularElements/assets/', 'elements/assets/' )
    
})()