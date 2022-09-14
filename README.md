Load typescript or ecmascript from filepath in Node

### Install

```
npm install --save module-require
```

### Usage

```js
const moduleRequire = require('module-require');

(async () => {
    // path/file.ts
    // export default function test() {
    //     console.log('hello!');
    // }
    const fileModule = await moduleRequire('/path/file.ts');

    fileModule.default();
    // -> hello!
})()

```

### API
#### moduleRequire(filepath, [options])

##### filepath
Required
Type: string

##### options.extensions
Type: string[]

##### options.swcConfig
Type: object

swc [options](https://swc.rs/docs/usage/core#options)
