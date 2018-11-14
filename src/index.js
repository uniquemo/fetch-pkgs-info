import GetPackageJsonProcess from './GetPackageJsonProcess'

export const retrievePkgs = ({ modules, attributes, installPkgTool }) => {
  return new GetPackageJsonProcess({
    modules,
    attributes,
    installPkgTool
  }).run()
}

export default GetPackageJsonProcess
