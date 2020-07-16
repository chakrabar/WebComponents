import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'stencil-components',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader'
        },
        {
            type: 'dist-custom-elements-bundle'
        },
        {
            type: 'docs-readme'
        },
        {
            type: 'www',
            serviceWorker: null // disable service workers
        }
    ]
};
