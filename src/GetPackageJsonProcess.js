const { exec } = require('child_process')
const fs = require('fs')

class GetPackageJsonProcess {
  constructor (modules, attributes) {
    this.modules = modules
    this.attributes = attributes
  }

  execute (command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error)
        resolve(stdout)
      })
    })
  }

  isYarnCommand () {
    const yarnLockFile = `${process.cwd()}/yarn.lock`
    return new Promise((resolve, reject) => {
      fs.access(yarnLockFile, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }

  async getNodeModuleInfo (name, version, attrs) {
    version = version ? `@${version}` : ''
    const isYarnCommand = await this.isYarnCommand()

    const cli = isYarnCommand ? 'yarn' : 'npm'
    attrs = isYarnCommand ? '' : attrs
    const command = `${cli} info ${name}${version}${attrs} --json`

    try {
      let result = await this.execute(command)
      result = result.replace(/\s/g, '')
      result = JSON.parse(result)

      return isYarnCommand ? result.data : result
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  run () {
    if (!Array.isArray(this.modules) || !this.modules.length) {
      throw new Error('this.modules must be an array with element(s)')
    }

    const attributes = this.attributes || []
    const attrs = attributes.reduce((prev, curr) => `${prev} ${curr}`, '')
  
    const promises = this.modules.map(m =>
      this.getNodeModuleInfo(
        m.name,
        m.version,
        attrs
      ))
    return Promise.all(promises)
  }
}

export default GetPackageJsonProcess
