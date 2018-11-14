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

const config = {
  modules: [
    { name: 'react', version: '16.0.0' },
    { name: 'redux', version: '4.0.0' }
  ]
}

new GetPackageJsonProcess(config).run()
  .then(result => {})
  .catch(err => {})
```

Or you can pass the second parameter to the constructor GetPackageJsonProcess to specify the attributes what need to be returned.
```javascript
import GetPackageJsonProcess, { retrievePkgs } from 'fetch-pkgs-info'

const config = {
  modules: [
    { name: 'react', version: '16.0.0' },
    { name: 'redux', version: '4.0.0' }
  ],
  attributes: ['name', 'version', 'dependencies'],
  installPkgTool: 'npm'
}

// method 1:
new GetPackageJsonProcess(config).run()
  .then(result => {})
  .catch(err => {})

// method 2:
retrievePkgs(config)
  .then(result => {})
  .catch(err => {})
```

### Config Description
#### 1.modules(Array/Object): package info of which to be fetched
Array: [{ name: 'react', version: '16.0.0' }]
Object: { name: 'react', version: '16.0.0' }

#### 2.attributes(Array/String): specific attributes that need to be obtained
Array: ['name', 'version']
String: 'name'

#### 3.installPkgTool: tool of installing packages
`Notice: If you don't offer installPkgTool's value, it will detect the yarn.lock file to check using yarn or npm.`
