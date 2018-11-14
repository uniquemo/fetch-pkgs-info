'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const convertDataToArray = (data) => {
  if (data) {
    if (Array.isArray(data)) {
      return data
    } else {
      return [data]
    }
  }
  return []
};

const { exec } = require('child_process');
const fs = require('fs');

const INSTALL_PKG_TOOL = {
  YARN: 'yarn',
  NPM: 'npm'
};

class GetPackageJsonProcess {
  constructor ({ modules, attributes, installPkgTool }) {
    this.modules = convertDataToArray(modules);
    this.attributes = convertDataToArray(attributes);
    this.installPkgTool = installPkgTool;
  }

  execute (command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout) => {
        if (error) reject(error);
        resolve(stdout);
      });
    })
  }

  isYarnCommand () {
    if (!this.installPkgTool) {
      const yarnLockFile = `${process.cwd()}/${INSTALL_PKG_TOOL.YARN}.lock`;
      return new Promise((resolve, reject) => {
        fs.access(yarnLockFile, fs.constants.R_OK | fs.constants.W_OK, (err) => {
          if (err) reject(err);
          resolve(true);
        });
      })
    }

    return Promise.resolve(
      this.installPkgTool === INSTALL_PKG_TOOL.YARN
        ? true
        : false
    )
  }

  async getNodeModuleInfo (name, version, attrs) {
    version = version ? `@${version}` : '';
    const isYarnCommand = await this.isYarnCommand();

    const cli = isYarnCommand ? INSTALL_PKG_TOOL.YARN : INSTALL_PKG_TOOL.NPM;
    attrs = isYarnCommand ? '' : attrs;
    const command = `${cli} info ${name}${version}${attrs} --json`;

    try {
      let result = await this.execute(command);
      result = JSON.parse(result.replace(/\s/g, ''));
      return isYarnCommand ? result.data : result
    } catch (err) {
      console.error(err);
      throw err
    }
  }

  run () {
    if (!this.modules.length) {
      throw new Error('this.modules is needed!!!')
    }

    const attrs = this.attributes.reduce((prev, curr) => `${prev} ${curr}`, '');
    const promises = this.modules.map(m =>
      this.getNodeModuleInfo(
        m.name,
        m.version,
        attrs
      ));
    return Promise.all(promises)
  }
}

const retrievePkgs = ({ modules, attributes, installPkgTool }) => {
  return new GetPackageJsonProcess({
    modules,
    attributes,
    installPkgTool
  }).run()
};

exports.retrievePkgs = retrievePkgs;
exports.default = GetPackageJsonProcess;
