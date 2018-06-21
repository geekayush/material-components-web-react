const path = require('path');
const {readdirSync, lstatSync} = require('fs');
const fsExtra = require('fs-extra');

const source = path.resolve(__dirname, '../../packages');
const destination = path.resolve(__dirname, '../../npm_packages');

const isDirectory = (source) => lstatSync(source).isDirectory();

const packages = [
  'button',
  'card',
  'fab',
  'floating-label',
  'line-ripple',
  'material-icon',
  'notched-outline',
  'ripple',
  'text-field',
  'top-app-bar',
];

function copyDirectories(filename, sourcePkgPath, destinationPkgPath) {
  if (filename.includes('node_modules')) {
    return;
  }

  const sourceFilePath = path.join(sourcePkgPath, filename);
  const destinationFilePath = path.join(destinationPkgPath, filename);

  fsExtra.copy(sourceFilePath, destinationFilePath)
    .then(() => console.log(`${sourceFilePath} -> ${destinationFilePath}`))
    .catch(() => console.log('error'));
};

function copyFiles(filename, sourcePkgPath, destinationPkgPath) {
  if (path.extname(filename) === '.js') {
    return;
  }
  const sourceFilePath = path.join(sourcePkgPath, filename);
  const destinationFilePath = path.join(destinationPkgPath, filename);

  fsExtra.copy(sourceFilePath, destinationFilePath)
    .then(() => console.log(`${sourceFilePath} -> ${destinationFilePath}`))
    .catch(() => console.log('error'));
}

packages.forEach((pkg) => {
  const sourcePkgPath = path.join(source, pkg);
  const destinationPkgPath = path.join(destination, pkg);
  const sourceDirectoryFiles = readdirSync(sourcePkgPath);

  sourceDirectoryFiles.forEach((filename) => {
    const filePath = path.join(sourcePkgPath, filename);
    if (isDirectory(filePath)) {
      copyDirectories(filename, sourcePkgPath, destinationPkgPath);
    } else {
      copyFiles(filename, sourcePkgPath, destinationPkgPath);
    }
  });
});
