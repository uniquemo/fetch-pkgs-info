# fetch-pkgs-info
A tool gets the package info of node modules.

### Install
Install from the NPM repository using yarn or npm:
```bash
yarn add fetch-pkgs-info
```
```bash
npm install fetch-pkgs-info
```

### Quick Start
Create a js file:
```javascript
import GetPackageJsonProcess from 'fetch-pkgs-info'

new GetPackageJsonProcess([
  { name: 'react', version: '16.0.0' },
  { name: 'redux', version: '4.0.0' }
]).run()
  .then(result => {})
  .catch(err => {})
```

Or you can pass the second parameter to the constructor GetPackageJsonProcess to specify the attributes what need to be returned.
```javascript
import GetPackageJsonProcess from 'fetch-pkgs-info'

new GetPackageJsonProcess([
  { name: 'react', version: '16.0.0' },
  { name: 'redux', version: '4.0.0' }
], ['name', 'version', 'dependencies']).run()
  .then(result => {})
  .catch(err => {})
```

### Notice
This tool detects the yarn.lock file to check using yarn or npm configuration.
